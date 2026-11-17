import { randomUUID } from "node:crypto";
import { decideMemoryAction } from "./memory.processor.js";
import { extractMemories } from "./memory.extractor.js";
import { memoryNamespace } from "./memory.namespace.js";

export function createMemoryService(store) {
  async function listMemories(userId) {
    const results = await store.search(memoryNamespace(userId), {
      filter: { status: "active" },
      limit: 100,
    });

    return results.map((item) => ({
      id: item.key,
      ...item.value,
    }));
  }

  async function saveCandidate({ userId, candidate }) {
    const namespace = memoryNamespace(userId);

    const matches = await store.search(namespace, {
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

    const decision =
      existing.length === 0
        ? { action: "insert", reason: "No existing memory" }
        : await decideMemoryAction(candidate, existing);

    const now = new Date().toISOString();

    if (decision.action === "insert") {
      const id = randomUUID();

      await store.put(namespace, id, {
        ...candidate,
        type: "semantic",
        status: "active",
        createdAt: now,
        updatedAt: now,
      });

      return { action: "insert", id };
    }

    if (decision.action === "update") {
      const old = matches.find(
        (item) => item.key === decision.existingMemoryId,
      );

      if (!old || !decision.revisedContent) {
        return { action: "review" };
      }

      await store.put(namespace, old.key, {
        ...old.value,
        content: decision.revisedContent,
        confidence: candidate.confidence,
        updatedAt: now,
      });

      return { action: "update", id: old.key };
    }

    return {
      action: decision.action,
      reason: decision.reason,
    };
  }

  async function processMessage({ userId, message }) {
    const candidates = await extractMemories(message);
    const results = [];

    for (const candidate of candidates) {
      const result = await saveCandidate({
        userId,
        candidate,
      });

      results.push(result);
    }

    return results;
  }

  async function deleteMemory({ userId, memoryId }) {
    const namespace = memoryNamespace(userId);
    const existing = await store.get(namespace, memoryId);

    if (!existing) {
      return false;
    }

    await store.delete(namespace, memoryId);
    return true;
  }

  return {
    listMemories,
    saveCandidate,
    processMessage,
    deleteMemory,
  };
}
