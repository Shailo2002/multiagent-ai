import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const Port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());

console.log("auth service ");
app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from auth route" });
});

app.listen(Port, () => {
  console.log("auth-server is running on ", Port);
  connectDb();
});
