import { createHash } from "node:crypto";

export function normalizeMemoryField(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "");
}

const attributeAliases = {
  db: "database",
  databasetype: "database",
  dbms: "database",
  programminglanguage: "language",
  programminglanguages: "language",
  techstack: "stack",
  technologies: "stack",
};

export function normalizeCandidate(candidate) {
  const subject = normalizeMemoryField(candidate.subject);

  const rawAttribute = normalizeMemoryField(candidate.attribute);
  const attribute = attributeAliases[rawAttribute] || rawAttribute;

  if (!subject || !attribute || !candidate.content?.trim()) {
    return null;
  }

  return {
    ...candidate,
    subject,
    attribute,
    content: candidate.content.trim(),
  };
}

export function getMemoryKey(candidate) {
  return createHash("sha256")
    .update(`${candidate.subject}:${candidate.attribute}`)
    .digest("hex");
}
