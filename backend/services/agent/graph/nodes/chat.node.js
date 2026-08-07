import { ChatOpenAI } from "@langchain/openai";



export const chatNode = async (state) => {
  const response = await model.invoke(state.messages);

  return {
    messages: [response],
  };
};
