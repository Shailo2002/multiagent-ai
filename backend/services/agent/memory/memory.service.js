import { decideMemoryAction } from "./memory.processor.js";
import { extractMemories } from "./memory.extractor.js";
import { memoryNamespace } from "./memory.namespace.js";
import {
  normalizeCandidate,
  normalizeMemoryField,
  getMemoryKey,
} from "./memory.utils.js";

export function createMemoryService(store) {
  async function listMemories(userId) {
    const results = await store.search(memoryNamespace(userId), {
      filter: { status: "active" },
      limit: 100,
    });

    return results.map((item) => ({
      ...item.value,
      id: item.key,
    }));
  }

  async function saveCandidate({ userId, candidate }) {
    const normalized = normalizeCandidate(candidate);

    if (!normalized) {
      return { action: "ignore", reason: "Invalid memory" };
    }

    const namespace = memoryNamespace(userId);
    const key = getMemoryKey(normalized);

    // Fast lookup for newly saved memories.
    const directMatch = await store.get(namespace, key);

    // Also check older UUID-based memories.
    const all = await store.search(namespace, {
      filter: { status: "active" },
      limit: 500,
    });

    const matches = all.filter((item) => {
      const value = item.value;

      return (
        normalizeMemoryField(value.subject) === normalized.subject &&
        normalizeMemoryField(value.attribute) === normalized.attribute
      );
    });

    if (
      directMatch?.value?.status === "active" &&
      !matches.some((item) => item.key === key)
    ) {
      matches.push(directMatch);
    }

    const existing = matches.map((item) => ({
      ...item.value,
      id: item.key,
    }));

    const decision = existing.length
      ? await decideMemoryAction(normalized, existing)
      : { action: "insert" };

    const now = new Date().toISOString();

    if (decision.action === "insert") {
      // Use a stable key for new memories.
      // If a legacy match exists, preserve it.
      const id = matches[0]?.key || key;

      await store.put(namespace, id, {
        ...normalized,
        type: "semantic",
        status: "active",
        createdAt: matches[0]?.value.createdAt || now,
        updatedAt: now,
      });

      return { action: "insert", id };
    }

    if (decision.action === "update") {
      const old = matches.find(
        (item) => item.key === decision.existingMemoryId,
      );

      if (!old || !decision.revisedContent) {
        return {
          action: "review",
          reason: "Invalid update decision",
        };
      }

      await store.put(namespace, old.key, {
        ...old.value,
        content: decision.revisedContent,
        confidence: normalized.confidence,
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
      results.push(await saveCandidate({ userId, candidate }));
    }

    return results;
  }

  async function deleteMemory({ userId, memoryId }) {
    const namespace = memoryNamespace(userId);
    const existing = await store.get(namespace, memoryId);

    if (!existing) return false;

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
