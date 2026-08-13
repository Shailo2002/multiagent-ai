import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatsData: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,

  reducers: {
    setChatsData: (state, action) => {
      state.chatsData = action.payload;
    },

    updateChatTitle: (state, action) => {
      const { chatId, title } = action.payload;

      state.chatsData = state.chatsData.map((chat) =>
        chat._id === chatId ? { ...chat, title } : chat,
      );
    },

    clearchatsData: (state) => {
      state.chatsData = [];
    },
  },
});

export const { setChatsData, updateChatTitle, clearChatsData } =
  chatsSlice.actions;

export default chatsSlice.reducer;
