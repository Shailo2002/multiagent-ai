export function memoryNamespace(userId) {
  if (!userId) {
    throw new Error("userId is required");
  }

  return ["users", String(userId), "memories"];
}
