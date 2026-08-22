import api from "../../utils/axios";

export const getMessages = async ({ chatId, cursor }) => {
  try {
    const response = await api.get(`/api/chat/get-message/${chatId}`, {
      params: {
        limit: 4,
        ...(cursor && { cursor }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Unable to get messages:", error);
  }
};
