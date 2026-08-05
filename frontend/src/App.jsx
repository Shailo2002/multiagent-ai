import "./App.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import api from "../utils/axios.js";

function App() {
  const handleLogin = async (token) => {
    try {
      const response = await api.post("/api/auth/login", { token });
      console.log("login response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      console.log("data : ", data);

      const token = await data.user.getIdToken();
      console.log("token : ", token);

      const loginResponse = await handleLogin(token);
      console.log("loginResponse : ", loginResponse);
    } catch (error) {
      console.error("Google login failed:", {
        code: error.code,
        message: error.message,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-lg bg-slate-300 p-2"
        onClick={googleLogin}
      >
        Sign in
      </button>
    </div>
  );
}

export default App;
