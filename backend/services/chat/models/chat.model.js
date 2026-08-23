import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true },
);

chatSchema.index({ userId: 1, createdAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
