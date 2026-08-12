import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatsData: (state, action) => {
      state.chats = action.payload;
    },

    clearChatsData: (state) => {
      state.chats = null;
    },
  },
});

export const { setChatsData, clearChatsData } = chatsSlice.actions;

export default chatsSlice.reducer;
