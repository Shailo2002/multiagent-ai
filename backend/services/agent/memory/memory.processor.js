import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";

const DecisionSchema = z.object({
  action: z.enum(["insert", "update", "ignore", "review"]),
  existingMemoryId: z.string().nullable(),
  revisedContent: z.string().nullable(),
  reason: z.string(),
});

const model = await getModel("other");

const decisionModel = model.withStructuredOutput(DecisionSchema);

export async function decideMemoryAction(candidate, existingMemories) {
  return decisionModel.invoke([
    new SystemMessage(`
      Compare the candidate memory with existing memories.

      Return one action:
      insert: New information.
      update: Corrects or replaces an existing fact.
      ignore: Duplicate or not worth storing.
      review: Ambiguous, contradictory, or insufficient evidence.

      Do not invent IDs.
      Only return an existingMemoryId from the supplied records.
      Do not overwrite unrelated project facts.
    `),
    new HumanMessage(
      JSON.stringify({
        candidate,
        existingMemories,
      }),
    ),
  ]);
}
