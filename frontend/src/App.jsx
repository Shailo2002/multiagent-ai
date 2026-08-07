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
import WorkspacePage from "./pages/WorkspacePage.jsx";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-(--color-page) px-6 text-center">
      <div>
        <p className="text-color-accent text-sm">404</p>

        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Page not found
        </h1>

        <a className="primary-button mt-8" href="/">
          Return home
        </a>
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
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={userData ? <Navigate to="/app" replace /> : <LoginPage />}
        />

        <Route
          path="/app"
          element={
            userData ? <WorkspacePage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
