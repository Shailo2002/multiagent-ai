import { getAllMemories } from "../../memory/long-term-memory.js";

export async function memoryLoaderNode(state, runtime) {
  const userId = runtime.context?.userId;
  const store = runtime.store;

  if (!userId || !store) {
    throw new Error("User context or memory store missing");
  }

  const memories = await getAllMemories(store, userId);

  console.log("Loaded long-term memories:", memories);

  return {
    longTermMemories: memories,
  };
}
