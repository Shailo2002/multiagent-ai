import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByChat: {},
};

const messageSlice = createSlice({
  name: "message",

  initialState,

  reducers: {
    setMessageData(state, action) {
      const { chatId, messages, cursor, hasMore } = action.payload;

      state.messagesByChat[chatId] = {
        messages,
        cursor,
        hasMore,
        loading: false,
      };
    },

    prependMessageData(state, action) {
      const { chatId, messages, cursor, hasMore } = action.payload;

      state.messagesByChat[chatId].messages = [
        ...messages,
        ...state.messagesByChat[chatId].messages,
      ];

      state.messagesByChat[chatId].cursor = cursor;
      state.messagesByChat[chatId].hasMore = hasMore;
    },

    addMessageData(state, action) {
      const { chatId, message } = action.payload;

      if (!state.messagesByChat[chatId]) {
        state.messagesByChat[chatId] = {
          messages: [],
          cursor: false,
          hasMore: false,
          loading: false,
        };
      }

      state.messagesByChat[chatId].messages.push(message);
    },

    setGenerating: (state, action) => {
      const { chatId, isGenerating } = action.payload;

      if (!state.messagesByChat[chatId]) {
        state.messagesByChat[chatId] = {
          messages: [],
          cursor: null,
          hasMore: false,
          isGenerating: false,
        };
      }

      state.messagesByChat[chatId].isGenerating = isGenerating;
    },
  },
});

export const {
  setMessageData,
  prependMessageData,
  addMessageData,
  setGenerating,
} = messageSlice.actions;

export default messageSlice.reducer;
