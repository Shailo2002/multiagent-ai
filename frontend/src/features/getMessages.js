import api from "../../utils/axios";

export const getMessages = async (chatId) => {
  try {
    const response = await api.get(`/api/chat/get-message/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Unable to create chat:", error);
  }
};
