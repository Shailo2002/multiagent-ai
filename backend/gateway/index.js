import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const authServiceUrl = process.env.AUTH_SERVICE || "http://localhost:3001";

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

app.listen(port, () => {
  console.log("Gateway is running on", port);
});
