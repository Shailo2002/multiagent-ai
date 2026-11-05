export function createMemoryRetriever(memoryStore) {
  async function retrieveContext({ userId, categories = [], limit = 5 }) {
    const namespace = [userId, "memories"];

    const results = await memoryStore.search(namespace, {
      filter: { status: "active" },
      limit: 100,
    });

    const relevant = results
      .filter(
        (item) =>
          categories.length === 0 || categories.includes(item.value.category),
      )
      .slice(0, limit);

    return relevant.map((item) => ({
      id: item.key,
      content: item.value.content,
      category: item.value.category,
    }));
  }

  return { retrieveContext };
}
