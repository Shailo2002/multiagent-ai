import express from "express";
import { agentCall } from "../controllers/agent.controller.js";

export const router = express.Router();

router.post("/", agentCall);
