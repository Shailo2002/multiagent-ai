import express from "express";
import dotenv from "dotenv";

import { connectDb } from "./config/db.js";
import {
  connectLangGraphDb,
  getLangGraphMongoClient,
} from "./config/langgraph-db.js";

import { buildGraph } from "./graph/buildGraph.js";
import { createMemoryStore } from "./config/long-term-store.js";
import { createMemoryService } from "./memory/memory.service.js";

import { router } from "./routes/agent.route.js";
import memoryRouter from "./routes/memory.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Agent Service running",
  });
});

app.use("/agentcall", router);
app.use("/memories", memoryRouter);

async function startServer() {
  try {
    await connectDb();
    await connectLangGraphDb();

    const client = getLangGraphMongoClient();

    const store = createMemoryStore(client);
    const memoryService = createMemoryService(store);

    const graph = await buildGraph(store);

    app.locals.graph = graph;
    app.locals.memoryService = memoryService;

    app.listen(PORT, () => {
      console.log(`Agent Service running on ${PORT}`);
    });
  } catch (error) {
    console.error("Agent startup failed:", error);
    process.exit(1);
  }
}

startServer();
