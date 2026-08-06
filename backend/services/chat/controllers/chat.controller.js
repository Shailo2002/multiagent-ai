import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("userId : ", userId);

    const conversation = await Conversation.create({ userId });
    res.status(201).json({
      data: conversation,
      message: "Conversation created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create conversation" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("userId : ", userId);

    const conversation = await Conversation.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(201).json({
      data: conversation,
      message: "Conversation get successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get conversation" });
  }
};

export const updateConversatioTitle = async (req, res) => {
  try {
    const { conversationId, title } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      title,
    });

    res.status(201).json({
      data: conversation,
      message: "Conversation updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update conversation" });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, content, role } = req.body;

    const message = await Message.create({ conversationId, content, role });

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
    const conversationId = req.params.conversationId;

    const message = await Message.find({ conversationId }).sort({
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
