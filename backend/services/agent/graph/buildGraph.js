import { StateGraph, START, END } from "@langchain/langgraph";
import { chatNode } from "./nodes/chat.node.js";
import { routerNode } from "./nodes/router.node.js";
import { searchNode } from "./nodes/search.node.js";
import { pdfNode } from "./nodes/pdf.node.js";
import { pptNode } from "./nodes/ppt.node.js";
import { codingNode } from "./nodes/coding.node.js";
import { imageNode } from "./nodes/image.node.js";
import { AgentState } from "./state.js";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { getLangGraphMongoClient } from "../config/langgraph-db.js";

const workflow = new StateGraph(AgentState);

workflow.addNode("router", routerNode);
workflow.addNode("chat", chatNode);
workflow.addNode("search", searchNode);
workflow.addNode("pdf", pdfNode);
workflow.addNode("ppt", pptNode);
workflow.addNode("coding", codingNode);
workflow.addNode("image", imageNode);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",
  (agentState) => {
    switch (agentState.route) {
      case "chat":
        return "chat";
        break;
      case "search":
        return "search";
        break;
      case "pdf":
        return "pdf";
        break;
      case "ppt":
        return "ppt";
        break;
      case "coding":
        return "coding";
        break;
      case "image":
        return "image";
        break;
      default:
        return "chat";
    }
  },
  {
    chat: "chat",
    search: "search",
    pdf: "pdf",
    ppt: "ppt",
    coding: "coding",
    image: "image",
  },
);
workflow.addEdge("search", "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("image", "__end__");

export const buildGraph = async () => {
  const client = getLangGraphMongoClient();

  const dbName = process.env.MONGODB_DB_NAME || "agent_db";

  const checkpointer = new MongoDBSaver({
    client,
    dbName,
  });

  await checkpointer.setup();

  return workflow.compile({
    checkpointer,
  });
};