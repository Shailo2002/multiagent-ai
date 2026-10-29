import { RemoveMessage } from "@langchain/core/messages";
import { getModel } from "../../config/llmModels.js";
import { summarizeConversation } from "../../memory/conversation-summary.js";

export async function contextManagerNode(state) {
  const messages = state.messages;
  const model = await getModel("chat");

  console.log("Current messages:", messages.length);

  if (messages.length <= 6) {
    console.log("Summarization skipped");
    return {};
  }

  console.log("Summarization triggered!");

  console.log("older summary:", state.conversationSummary);

  const olderMessages = messages.slice(0, -4);

  const summary = await summarizeConversation(
    state.conversationSummary || "",
    olderMessages,
    model,
  );

  console.log("Generated summary:", summary);

  const messagesToRemove = olderMessages.map(
    (msg) => new RemoveMessage({ id: msg.id }),
  );

  return {
    conversationSummary: summary,
    messages: messagesToRemove,
  };
}
