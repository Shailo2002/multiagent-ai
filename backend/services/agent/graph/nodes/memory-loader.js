import { memoryNamespace } from "../../memory/memory.namespace.js";

export async function memoryLoaderNode(state, runtime) {
  const userId = runtime.context?.userId;
  const store = runtime.store;

  if (!userId || !store) {
    throw new Error("Missing userId or memory store");
  }

  const results = await store.search(memoryNamespace(userId), {
    filter: { status: "active" },
    limit: 20,
  });

  const memories = results.map((item) => ({
    id: item.key,
    content: item.value.content,
    category: item.value.category,
  }));

  return {
    longTermMemories: memories,
  };
}
