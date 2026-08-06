import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/chat.route.js";
dotenv.config();
const Port = process.env.PORT || 3002;

const app = express();
app.use(express.json());

console.log("chat service ");

app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from chat route" });
});

app.listen(Port, () => {
  console.log("chat-server is running on ", Port);
  connectDb();
});
