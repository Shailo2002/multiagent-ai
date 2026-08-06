import {
  StateSchema,
  MessagesValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import { State } from "./state.js";
import { OpenAI } from "@langchain/openai";

const mockLlm = (state) => {
  return { messages: [{ role: "ai", content: "hello world" }] };
};

const llm = new OpenAI({
  model: "gpt-3.5-turbo-instruct",
  temperature: 0,
  maxTokens: undefined,
  timeout: undefined,
  maxRetries: 2,
  apiKey: process.env.OPENAI_API_KEY,
});

const callLLM = async (state) => {
  const response = await llm.invoke([...state.messages]);

  return {
    messages: [response],
  };
};

export const graph = new StateGraph(State)
  .addNode("llm", callLLM)
  .addEdge(START, "llm")
  .addEdge("llm", END)
  .compile();
