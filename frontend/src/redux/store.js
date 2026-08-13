import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messagesReducer from "./messagesSlice.js";
import chatsReducer from "./chatsSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
});
