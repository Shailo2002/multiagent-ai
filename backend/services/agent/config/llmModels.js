import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

const getOpenAI = () =>
  new ChatOpenAI({
    model: "gpt-4.1-nano",
    maxRetries: 2,
  });

const getAnthropic = () =>
  new ChatAnthropic({
    model: "claude-haiku-4-5-20251001",
    maxRetries: 2,
  });

const getGemini = () =>
  new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    maxRetries: 2,
  });

export const getModel = async (agent) => {
  switch (agent) {
    // return getOpenAI();
    case "chat":
    case "search":
    case "pdf":
    case "ppt":
    case "coding":
      return getAnthropic();

    case "image":
      return getGemini();

    default:
      return getAnthropic();
  }
};
