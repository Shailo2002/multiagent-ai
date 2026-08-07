import { SystemMessage } from "@langchain/core/messages";
import { getModel } from "../../config/llmModels.js";
import { z } from "zod/v4";
import { routerSystemPrompt } from "../prompts/router.prompt.js";

const RouterOutputSchema = z.object({
  route: z.enum(["chat", "search", "code", "ppt", "pdf", "image"]),
  confidence: z.number().min(0).max(1),
  reason: z.string(),
});

export const routerNode = async (state) => {
  const llm = await getModel("router");

  const routerModel = llm.withStructuredOutput(RouterOutputSchema);

  const decision = await routerModel.invoke([
    new SystemMessage(routerSystemPrompt),
    ...state.messages,
  ]);

  console.log("decision : ", decision);

  return {
    route: decision.route,
    confidence: decision.confidence,
    routeReason: decision.reason,
  };
};
