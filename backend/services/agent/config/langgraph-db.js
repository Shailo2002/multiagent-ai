import { MongoClient } from "mongodb";

let langGraphMongoClient;

export const connectLangGraphDb = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
  }

  langGraphMongoClient = new MongoClient(process.env.MONGODB_URL);

  await langGraphMongoClient.connect();

  console.log("LangGraph MongoDB connected");

  return langGraphMongoClient;
};

export const getLangGraphMongoClient = () => {
  if (!langGraphMongoClient) {
    throw new Error("LangGraph MongoClient has not been initialized");
  }

  return langGraphMongoClient;
};
