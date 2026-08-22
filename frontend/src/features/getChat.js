import api from "../../utils/axios";

const getChat = async () => {
  try {
    const response = await api.get("/api/chat/get-chat");
    return response.data;
  } catch (error) {
    console.error("Unable to get chat:", error);
  }
};

export default getChat;
