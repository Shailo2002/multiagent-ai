const stopWords = new Set([
  "i",
  "me",
  "my",
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "what",
  "which",
  "who",
  "how",
  "does",
  "do",
  "to",
  "for",
  "of",
  "in",
  "on",
  "and",
  "or",
  "you",
  "use",
  "uses",
  "tell",
  "about",
  "please",
]);

const aliases = {
  db: "database",
  databases: "database",
  dbms: "database",
  coding: "programming",
  languages: "language",
};

function tokenize(text) {
  return (
    String(text || "")
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      ?.map((word) => aliases[word] || word)
      .filter((word) => word.length > 1 && !stopWords.has(word)) || []
  );
}

export function rankMemories(memories, query, limit = 5) {
  const queryWords = new Set(tokenize(query));

  if (!queryWords.size) return [];

  return memories
    .map((memory) => {
      const memoryWords = new Set(
        tokenize(
          [
            memory.content,
            memory.subject,
            memory.attribute,
            memory.category,
          ].join(" "),
        ),
      );

      let score = 0;

      for (const word of queryWords) {
        if (memoryWords.has(word)) {
          score += 1;
        }
      }

      return { ...memory, score };
    })
    .filter((memory) => memory.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
