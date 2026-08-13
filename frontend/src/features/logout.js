import api from "../../utils/axios";

const logoutUser = async () => {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Unable to logout user:", error);
  }
};

export default logoutUser;
