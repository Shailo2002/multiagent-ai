import { HumanMessage } from "@langchain/core/messages";

export const agentCall = async (req, res) => {
  try {
    console.log("agentcall controller");
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }

    // const responseMessage = await workflow.invoke({
    //   messages: [
    //     new HumanMessage({
    //       content: message.trim(),
    //     }),
    //   ],
    // });

    res.status(200).json({ response: "hi from agent controller" });
  } catch (error) {
    console.error("Error in agentCall:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
