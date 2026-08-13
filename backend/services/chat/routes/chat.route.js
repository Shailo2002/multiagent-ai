import express from "express";
import {
  createChat,
  getChat,
  getMessage,
  saveMessage,
  updateChatTitle,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/create-chat", createChat);
router.get("/get-chat", getChat);
router.post("/update-chat", updateChatTitle);
router.post("/save-message", saveMessage);
router.get("/get-message/:chatId", getMessage);

export default router;
