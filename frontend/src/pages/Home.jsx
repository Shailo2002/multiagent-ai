import React from "react";
import api from "../../utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../redux/userSlice.js";

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");
      dispatch(clearUserData());
      return response;
    } catch (error) {
      console.log("error : ", error);
      return null;
    }
  };

  const handleAiCall = async () => {
    try {
      const response = await api.post("/api/agent/agentcall", {
        message: "hi, what is capital of portugal?",
      });
      console.log("response : ", response);
      return response;
    } catch (error) {
      console.log("error : ", error);
      return null;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-blue-500 rounded">
        <div>user Home</div>
        <div>{userData?.name ? userData?.name : "no username"}</div>
        {/* <button onClick={handleLogout} className="my-2 bg-black">
          Logout
        </button> */}
        <button onClick={handleAiCall} className="my-2 bg-black">
          Ai call
        </button>
      </div>
    </div>
  );
}

export default Home;
