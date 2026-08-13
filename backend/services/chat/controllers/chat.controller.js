import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    const chat = await Chat.create({ userId });
    res.status(201).json({
      data: chat,
      message: "chat created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat" });
  }
};

export const getChat = async (req, res) => {
  try {
    console.log("get chat controller ping");

    const userId = req.headers["x-user-id"];
    console.log("userId : ", userId);

    const chat = await Chat.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(201).json({
      data: chat,
      message: "Chat get successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get chat" });
  }
};

export const updateChatTitle = async (req, res) => {
  try {
    const { chatId, title } = req.body;

    const chat = await Chat.findByIdAndUpdate(chatId, {
      title,
    });

    res.status(201).json({
      data: chat,
      message: "Chat updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update chat" });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { chatId, content, role } = req.body;

    const message = await Message.create({ chatId, content, role });

    res.status(201).json({
      data: message,
      message: "Message saved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save Message" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const message = await Message.find({ chatId }).sort({
      createdAt: -1,
    });

    res.status(201).json({
      data: message,
      message: "Messages get successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Messages" });
  }
};
