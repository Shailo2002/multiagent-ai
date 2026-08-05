import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagen-ai.firebaseapp.com",
  projectId: "multiagen-ai",
  storageBucket: "multiagen-ai.firebasestorage.app",
  messagingSenderId: "1062978637322",
  appId: "1:1062978637322:web:6a8924b5e3c0646d2b99f3",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});

export const googleProvider = new GoogleAuthProvider();
