import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

export const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  temperature: 0,
  maxRetries: 2,
  // other params...
});

export const openai = new ChatOpenAI({
  model: process.env.OPENAI_MODEL,
  temperature: 0,
  maxRetries: 2,
});

const anthropic = new ChatAnthropic({
  model: "claude-haiku-4-5-20251001",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return openai;
      break;
    case "search":
      return openai;
      break;
    case "pdf":
      return anthropic;
      break;
    case "ppt":
      return anthropic;
      break;
    case "coding":
      return anthropic;
      break;
    case "image":
      return gemini;
      break;
    default:
      return openai;
  }
};
