import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    role: {
      type: String,
      enums: ["user", "assistant"],
    },
    content: String,
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
