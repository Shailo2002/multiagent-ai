import { HumanMessage } from "@langchain/core/messages";
import axios from "axios";

const chatUrl = process.env.CHAT_SERVICE || "http://localhost:3002";

export const agentCall = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    const userId = req.headers["x-user-id"];

    if (!message || !chatId) {
      return res.status(400).json({
        message: "message and chatId are required",
      });
    }

    const graph = req.app.locals.graph;

    if (!graph) {
      throw new Error("Graph is not initialized");
    }

    const response = await graph.invoke(
      {
        messages: [
          new HumanMessage({
            content: message.trim(),
          }),
        ],
      },
      {
        configurable: {
          thread_id: chatId,
        },
      },
    );

    const aiContent = response?.messages?.at(-1)?.content;

    if (!aiContent) {
      throw new Error("AI response is empty");
    }

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

    const assistantMessage = savedAiResponse.data?.data;

    return res.status(200).json({
      message: "AI response generated",
      data: {
        chatId,
        assistantMessage,
      },
    });
  } catch (error) {
    console.error("Error in agentCall:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
