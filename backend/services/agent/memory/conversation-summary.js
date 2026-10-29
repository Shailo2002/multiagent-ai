import { HumanMessage, SystemMessage } from "@langchain/core/messages";

function formatMessages(messages) {
  return messages
    .map((message) => {
      const role = message._getType();

      const roleName =
        {
          human: "User",
          ai: "Assistant",
          system: "System",
          tool: "Tool",
        }[role] || role;

      const content =
        typeof message.content === "string"
          ? message.content
          : JSON.stringify(message.content);

      return `${roleName}: ${content}`;
    })
    .join("\n\n");
}

export async function summarizeConversation(
  previousSummary,
  olderMessages,
  model,
) {
  const response = await model.invoke([
    new SystemMessage(`
      Update the conversation summary.

      Preserve:
      - Important facts and decisions
      - Unresolved questions
      - Current task context
      - Important references

      Do not invent details.
      Return a concise updated summary.
    `),
    new HumanMessage(`
      Previous summary:
      ${previousSummary || "None"}

      New conversation content:
      ${formatMessages(olderMessages)}
    `),
  ]);

  return response.content;
}
