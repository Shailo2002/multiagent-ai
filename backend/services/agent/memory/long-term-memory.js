export async function saveMemory(store, userId, key, value) {
  const namespace = ["users", String(userId), "memories"];

  await store.put(namespace, key, {
    ...value,
    updatedAt: new Date().toISOString(),
  });
}

export async function getMemory(store, userId, key) {
  const namespace = ["users", String(userId), "memories"];

  const result = await store.get(namespace, key);

  return result?.value ?? null;
}

export async function getAllMemories(store, userId) {
  const namespace = ["users", String(userId), "memories"];

  const memories = await store.search(namespace, {
    limit: 50,
  });

  return memories.map((memory) => ({
    key: memory.key,
    ...memory.value,
  }));
}
