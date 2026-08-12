import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import chatsSlice from "./chatSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsSlice,
  },
});
