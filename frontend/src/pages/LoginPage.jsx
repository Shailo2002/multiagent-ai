import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BrandLogo } from "../components/BrandLogo.jsx";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, clearUserData } from "../redux/userSlice.js";
import api from "../../utils/axios.js";

function LoginPage() {
  const dispatch = useDispatch();
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
    <main className="bg-canvas relative flex min-h-dvh items-center justify-center px-5 pb-[8vh]">
      <section className="flex w-full max-w-md flex-col items-center text-center">
        <BrandLogo className="h-8 w-8" />

        <h1 className="mt-12 text-[24px] leading-tight tracking-[-0.03em] text-white">
          Log In or Sign Up
        </h1>

        <p className="text-muted mt-3 text-[14px] font-light sm:text-base">
          To access the best way to work with AI
        </p>

        <button
          className="rounded-pill focus-visible:outline-accent mt-8 flex h-12 w-full items-center justify-center gap-3 border border-white/10 bg-white px-5 text-[14px] text-black transition duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.99]"
          onClick={googleLogin}
          type="button"
        >
          <FcGoogle aria-hidden="true" size={22} />
          <span>Continue with Google</span>
        </button>
      </section>

      <p className="text-muted absolute right-5 bottom-7 left-5 text-center text-xs">
        By continuing, you agree to our{" "}
        <a
          className="hover:text-soft underline underline-offset-2 transition"
          href="/terms"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          className="hover:text-soft underline underline-offset-2 transition"
          href="/privacy"
        >
          Privacy Policy
        </a>
        .
      </p>
    </main>
  );
}

export default LoginPage;
