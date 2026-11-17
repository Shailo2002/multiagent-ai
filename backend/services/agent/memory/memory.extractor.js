import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";

const MemorySchema = z.object({
  memories: z.array(
    z.object({
      content: z.string(),
      category: z.enum(["preference", "project", "skill", "goal", "other"]),
      subject: z.string(),
      attribute: z.string(),
      confidence: z.number().min(0).max(1),
    }),
  ),
});

const model = await getModel("other");

const extractor = model.withStructuredOutput(MemorySchema);

export async function extractMemories(message) {
  const result = await extractor.invoke([
    new SystemMessage(`
      Extract durable, useful memories from the USER message.

      Rules:
      - Extract explicit user facts, preferences and goals.
      - Store durable project information.
      - Never invent information.
      - Do not extract facts from hypothetical questions.
      - Do not extract passwords, tokens or credentials.
      - Avoid sensitive personal information.
      - Return an empty memories array if nothing is useful.
      - Use stable subject and attribute names.
      - Each memory should represent one atomic fact.
      - Use lowercase canonical subject names.
      - Prefer stable project identifiers over generic labels.
      - Use "database" as the attribute for database technology.
      - Use "language" for a programming language preference.
      - Resolve aliases consistently when possible.
      - Never extract instructions to forget something as a new memory.
      - Never extract facts about unrelated third parties.
    `),
    new HumanMessage(message),
  ]);

  return result.memories;
}
