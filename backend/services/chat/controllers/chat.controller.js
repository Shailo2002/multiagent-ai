import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const createChat = async (req, res) => {
  try {
    console.log("create chat route");
    const userId = req.headers["x-user-id"];
    const { title } = req.body;

    const chat = await Chat.create({
      userId,
      ...(title && { title }),
    });
    res.status(201).json({
      data: chat,
      message: "chat created successfully",
    });

    console.log("chat :  ", chat);
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

    const userId = req.headers["x-user-id"];

    if (!chatId || !content || !role) {
      return res.status(400).json({
        message: "chatId, content and role are required",
      });
    }

    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    const message = await Message.create({
      chatId,
      content,
      role,
    });

    return res.status(201).json({
      data: message,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("saveMessage error:", error);

    return res.status(500).json({
      message: "Failed to save message",
    });
  }
};

export const sendMessage2 = async (req, res) => {
  try {
    let { chatId, content } = req.body;

    const userId = req.headers["x-user-id"];

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        message: "Message content is required",
      });
    }

    content = content.trim();

    let chat;
    let isNewChat = false;

    if (!chatId) {
      const title =
        content.length > 50 ? `${content.slice(0, 50)}...` : content;

      chat = await Chat.create({
        title,
        userId,
      });

      chatId = chat._id;

      isNewChat = true;
    } else {
      chat = await Chat.findOne({
        _id: chatId,
        userId,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    }

    const userMessage = await Message.create({
      chatId,
      content,
      role: "user",
    });

    return res.status(201).json({
      message: "Message saved",

      data: {
        chatId,
        isNewChat,
        userMessage,
      },
    });
  } catch (error) {
    console.error("sendMessage error:", error);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    let { chatId, content } = req.body;

    const userId = req.headers["x-user-id"];

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        message: "Message content is required",
      });
    }

    content = content.trim();

    let chat;
    let isNewChat = false;

    if (!chatId) {
      const title =
        content.length > 50 ? `${content.slice(0, 50)}...` : content;

      chat = await Chat.create({
        title,
        userId,
      });

      chatId = chat._id;

      isNewChat = true;
    }

    else {
      chat = await Chat.findOne({
        _id: chatId,
        userId,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    }

    const userMessage = await Message.create({
      chatId,
      content,
      role: "user",
    });

    return res.status(201).json({
      message: "Message saved",

      data: {
        chatId,
        isNewChat,
        userMessage,
      },
    });
  } catch (error) {
    console.error("sendMessage error:", error);

    return res.status(500).json({
      message: "Failed to send message",
    });
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
