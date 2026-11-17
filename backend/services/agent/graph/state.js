import { Annotation, MessagesValue, StateSchema } from "@langchain/langgraph";
import { z } from "zod/v4";

export const AgentState = new StateSchema({
  messages: MessagesValue,

  conversationSummary: z.string().optional(),

  longTermMemories: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        category: z.string(),
      }),
    )
    .default([]),

  route: z.enum(["chat", "search", "coding", "ppt", "pdf", "image"]).optional(),

  confidence: z.number().min(0).max(1).optional(),
  routeReason: z.string().optional(),
});
