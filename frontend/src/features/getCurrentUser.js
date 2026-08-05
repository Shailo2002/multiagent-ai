import api from "../../utils/axios";

const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/user");
    return response.data;
  } catch (error) {
    console.error("Unable to get user:", error);
  }
};

export default getCurrentUser;
