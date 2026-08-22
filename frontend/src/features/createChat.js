import api from "../../utils/axios";

const createChat = async () => {
  try {
    const response = await api.post("/api/chat/create-chat");
    console.log("response of new chat : ", response);
    return response.data;
  } catch (error) {
    console.error("Unable to create Chat:", error);
  }
};

export default createChat;
