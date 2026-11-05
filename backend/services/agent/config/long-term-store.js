import { MongoDBStore } from "@langchain/langgraph-checkpoint-mongodb";


export function createMemoryStore(client) {
  return new MongoDBStore({
    client,
    dbName: "agent_db",
    collectionName: "long_term_memory",
  });
}
