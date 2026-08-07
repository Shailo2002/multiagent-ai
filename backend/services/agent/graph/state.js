import { MessagesValue, StateSchema } from "@langchain/langgraph";
import { z } from "zod/v4";

export const AgentState = new StateSchema({
  messages: MessagesValue,

  route: z.enum(["chat", "search", "code", "ppt", "pdf", "image"]).optional(),

  confidence: z.number().min(0).max(1).optional(),

  routeReason: z.string().optional(),
});
