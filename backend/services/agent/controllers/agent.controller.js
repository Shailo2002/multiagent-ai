import { HumanMessage } from "@langchain/core/messages";
import axios from "axios";

const chatUrl = process.env.CHAT_SERVICE || "http://localhost:3002";

export const agentCall = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (typeof message !== "string" || !message.trim() || !chatId) {
      return res.status(400).json({
        message: "message and chatId are required",
      });
    }

    const graph = req.app.locals.graph;
    const memoryService = req.app.locals.memoryService;

    if (!graph || !memoryService) {
      throw new Error("Agent is not initialized");
    }

    // 1. Verify user owns this chat BEFORE checkpoint access
    await axios.get(`${chatUrl}/get-message/${encodeURIComponent(chatId)}`, {
      params: { limit: 1 },
      headers: { "x-user-id": userId },
    });

    // 2. Extract, compare and save long-term memories
    try {
      const results = await memoryService.processMessage({
        userId: String(userId),
        message: message.trim(),
      });

      console.log("Memory actions:", results);
    } catch (memoryError) {
      // Memory extraction failure should not stop normal chat
      console.error("Memory processing failed:", memoryError);
    }

    // 3. Invoke LangGraph
    const config = {
      configurable: {
        thread_id: chatId,
      },
      context: {
        userId: String(userId),
      },
    };

    const response = await graph.invoke(
      {
        messages: [
          new HumanMessage({
            content: message.trim(),
          }),
        ],
      },
      config,
    );

    const aiContent = response?.messages?.at(-1)?.content;

    if (!aiContent) {
      throw new Error("AI response is empty");
    }

    // 4. Save AI response in Chat Service
    const savedAiResponse = await axios.post(
      `${chatUrl}/save-message`,
      {
        chatId,
        content: aiContent,
        role: "assistant",
      },
      {
        headers: {
          "x-user-id": userId,
        },
      },
    );

    return res.status(200).json({
      message: "AI response generated",
      data: {
        chatId,
        assistantMessage: savedAiResponse.data.data,
      },
    });
  } catch (error) {
    console.error("Agent error:", error);

    const status = error.response?.status;

    if (status === 404) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    return res.status(500).json({
      message: "Agent request failed",
    });
  }
};
