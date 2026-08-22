import express from "express";
import {
  createChat,
  getChat,
  getMessage,
  saveMessage,
  sendMessage,
  updateChatTitle,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/create-chat", createChat);
router.get("/get-chat", getChat);
router.post("/update-chat", updateChatTitle);
router.post("/save-message", saveMessage);
router.get("/get-message/:chatId", getMessage);
router.post("/send-message", sendMessage);

export default router;
