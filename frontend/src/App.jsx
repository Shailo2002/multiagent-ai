import "./App.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import api from "../utils/axios.js";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, clearUserData } from "./redux/userSlice.js";
import getCurrentUser from "./features/getCurrentUser.js";
import WorkspacePage from "./pages/WorkspacePage.jsx";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-(--color-page) px-6 text-center font-serif">
      <div>
        <p className="text-color-accent text-4xl">404</p>

        <h1 className="mt-2 text-4xl tracking-tight">Page not found</h1>

        <button
          className="primary-button bg-accent text-canvas mt-6 rounded-full p-2 px-4"
          href="/"
        >
          Return home
        </button>
      </div>
    </main>
  );
}

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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userData ? <WorkspacePage /> : <LandingPage />}
        />
        <Route
          path="/chat/:chatId"
          element={userData ? <WorkspacePage /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={userData ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
