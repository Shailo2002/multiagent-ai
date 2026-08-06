import { HumanMessage } from "@langchain/core/messages";
import { graph } from "../graph/buildGraph.js";

export const agentCall = async (req, res) => {
  try {
    console.log("agentcall controller");
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }

    const responseMessage = await graph.invoke({
      messages: [new HumanMessage(message)],
    });

    res.status(200).json({ response: responseMessage });
  } catch (error) {
    console.error("Error in agentCall:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
