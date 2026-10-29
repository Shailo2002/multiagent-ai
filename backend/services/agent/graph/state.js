import { MessagesValue, StateSchema } from "@langchain/langgraph";
import { z } from "zod/v4";

export const AgentState = new StateSchema({
  messages: MessagesValue,

  conversationSummary: z.string().optional(),

  route: z.enum(["chat", "search", "coding", "ppt", "pdf", "image"]).optional(),

  confidence: z.number().min(0).max(1).optional(),

  routeReason: z.string().optional(),
});
