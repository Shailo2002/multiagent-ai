import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { router } from "./routes/agent.route.js";

dotenv.config();
const Port = process.env.PORT || 3003;

const app = express();

app.use(express.json());

console.log("agent service ");

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from agent service" });
});

app.use("/agentcall", router);

app.listen(Port, () => {
  console.log("agent-server is running on ", Port);
  connectDb();
});
