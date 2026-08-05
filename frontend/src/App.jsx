import "./App.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import api from "../utils/axios.js";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, clearUserData } from "./redux/userSlice.js";
import getCurrentUser from "./features/getCurrentUser.js";

function App() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      if (data) {
        dispatch(setUserData(data));
      } else {
        dispatch(clearUserData());
      }
    };
    getUser();
  }, []);

  const handleLogin = async (token) => {
    try {
      const response = await api.post("/api/auth/login", { token });

      dispatch(setUserData(response.data));

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      dispatch(clearUserData());
      return null;
    }
  };

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const token = await data.user.getIdToken();

      await handleLogin(token);
    } catch (error) {
      console.error("Google login failed:", {
        code: error.code,
        message: error.message,
      });
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onPrimaryAction={googleLogin} />}
        />

        <Route
          path="/login"
          element={userData ? <Navigate to="/home" replace /> : <LoginPage />}
        />

        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
