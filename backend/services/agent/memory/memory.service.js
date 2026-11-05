import { randomUUID } from "node:crypto";
import { decideMemoryAction } from "./memory.processor.js";

// memoryStore is the initialized Stage 3 MongoDBStore.
// Inject it once during application startup.
export function createMemoryService(memoryStore) {
  async function saveCandidate({ userId, candidate }) {
    const namespace = [userId, "memories"];

    // Metadata search works without vector search.
    const matches = await memoryStore.search(namespace, {
      filter: {
        subject: candidate.subject,
        attribute: candidate.attribute,
        status: "active",
      },
      limit: 20,
    });

    const existing = matches.map((item) => ({
      id: item.key,
      ...item.value,
    }));

    const decision = await decideMemoryAction(candidate, existing);

    if (decision.action === "ignore" || decision.action === "review") {
      return decision;
    }

    const now = new Date().toISOString();

    if (decision.action === "update") {
      const old = matches.find(
        (item) => item.key === decision.existingMemoryId,
      );

      if (!old || !decision.revisedContent) {
        return { action: "review" };
      }

      await memoryStore.put(namespace, old.key, {
        ...old.value,
        content: decision.revisedContent,
        confidence: candidate.confidence,
        updatedAt: now,
      });

      return { action: "update", id: old.key };
    }

    if (decision.action === "insert") {
      const id = randomUUID();

      await memoryStore.put(namespace, id, {
        ...candidate,
        type: "semantic",
        status: "active",
        createdAt: now,
        updatedAt: now,
      });

      return { action: "insert", id };
    }

    return { action: "review" };
  }

  return { saveCandidate };
}
