import { HumanMessage } from "@langchain/core/messages";
import { memoryNamespace } from "../../memory/memory.namespace.js";
import { rankMemories } from "../../memory/memory.relevance.js";

export async function memoryLoaderNode(state, runtime) {
  const userId = runtime.context?.userId;
  const store = runtime.store;

  if (!userId || !store) {
    throw new Error("Missing userId or memory store");
  }

  const latestMessage = [...state.messages]
    .reverse()
    .find(
      (message) =>
        HumanMessage.isInstance(message) || message._getType?.() === "human",
    );

  const query =
    typeof latestMessage?.content === "string" ? latestMessage.content : "";

  const results = await store.search(memoryNamespace(userId), {
    filter: { status: "active" },
    limit: 500,
  });

  const memories = results.map((item) => ({
    id: item.key,
    content: item.value.content || "",
    category: item.value.category || "other",
    subject: item.value.subject || "",
    attribute: item.value.attribute || "",
  }));

  const relevant = rankMemories(memories, query, 5);

  console.log(
    "Relevant memories:",
    relevant.map((memory) => memory.content),
  );

  return {
    longTermMemories: relevant.map((memory) => ({
      id: memory.id,
      content: memory.content,
      category: memory.category,
    })),
  };
}
