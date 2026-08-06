import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.contoller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const authServiceUrl = process.env.AUTH_SERVICE || "http://localhost:3001";
const chatServiceUrl = process.env.CHAT_SERVICE || "http://localhost:3002";
const agentServiceUrl = process.env.AGENT_SERVICE || "http://localhost:3003";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from home route" });
});

app.use("/api/auth", proxy(authServiceUrl));
app.use("/api/chat", authMiddleware, proxyWithHeader(chatServiceUrl));
app.get("/api/user", authMiddleware, getCurrentUser);
app.use("/api/agent", authMiddleware, proxyWithHeader(agentServiceUrl));

app.listen(port, () => {
  console.log("Gateway is running on", port);
});
