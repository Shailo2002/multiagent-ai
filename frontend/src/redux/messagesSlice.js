import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByChat: {
    "66bcb61d8e5e4c2b18a1a101": {
      messages: [
        {
          chatId: "66bcb61d8e5e4c2b18a1a101",
          role: "user",
          content:
            "Can you explain how React Router works in a chat application?",
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a101",
          role: "assistant",
          content: `React Router is useful in a chat application because it lets you represent the currently selected Chat directly in the URL.

For example, you can create a route like:

/chat/:chatId

If a user clicks a chat with the ID "12345", the URL becomes:

/chat/12345

Inside your Chatbox component, you can access that ID using useParams().

Once you have the chatId, you can send a request to your backend to fetch all messages belonging to that Chat.

The nice thing is that React Router performs client-side navigation, so the browser does not reload the whole page.

This means your sidebar can remain visible while only the chat content changes.

You can also use nested routes with an Outlet component so that WorkspacePage acts as a shared layout.

That structure works especially well for apps similar to ChatGPT, where the sidebar is persistent and the selected Chat changes frequently.`,
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a101",
          role: "user",
          content: "How should I fetch the messages when the chatId changes?",
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a101",
          role: "assistant",
          content: `You can watch the chatId using a useEffect inside your Chatbox component.

First, get the ID from React Router using:

const { chatId } = useParams();

Then create a useEffect that depends on chatId.

Whenever the user clicks another Chat, React Router updates the URL and the chatId value changes.

That causes your effect to run again.

Inside the effect, call your backend endpoint, for example:

GET /api/chat/:chatId/messages

Your backend can then query MongoDB using Message.find({ chatId }).

Make sure you sort the messages by createdAt so they appear in the correct order.

Once the response comes back, store the messages in local state or Redux.

Your Chatbox component can then map over those messages and render the user and assistant messages differently.`,
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a101",
          role: "user",
          content: "Should I store the messages in Redux or component state?",
        },
      ],
      cursor: null,
      hasMore: false,
      loading: false,
    },

    "66bcb61d8e5e4c2b18a1a102": {
      messages: [
        {
          chatId: "66bcb61d8e5e4c2b18a1a102",
          role: "user",
          content:
            "Can you explain how React Router works in a chat application?",
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a102",
          role: "assistant",
          content: `React Router is useful in a chat application because it lets you represent the currently selected Chat directly in the URL.

For example, you can create a route like:

/chat/:chatId

If a user clicks a chat with the ID "12345", the URL becomes:

/chat/12345

Inside your Chatbox component, you can access that ID using useParams().

Once you have the chatId, you can send a request to your backend to fetch all messages belonging to that Chat.

The nice thing is that React Router performs client-side navigation, so the browser does not reload the whole page.

This means your sidebar can remain visible while only the chat content changes.

You can also use nested routes with an Outlet component so that WorkspacePage acts as a shared layout.

That structure works especially well for apps similar to ChatGPT, where the sidebar is persistent and the selected Chat changes frequently.`,
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a102",
          role: "user",
          content: "How should I fetch the messages when the chatId changes?",
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a102",
          role: "assistant",
          content: `You can watch the chatId using a useEffect inside your Chatbox component.

First, get the ID from React Router using:

const { chatId } = useParams();

Then create a useEffect that depends on chatId.

Whenever the user clicks another Chat, React Router updates the URL and the chatId value changes.

That causes your effect to run again.

Inside the effect, call your backend endpoint, for example:

GET /api/chat/:chatId/messages

Your backend can then query MongoDB using Message.find({ chatId }).

Make sure you sort the messages by createdAt so they appear in the correct order.

Once the response comes back, store the messages in local state or Redux.

Your Chatbox component can then map over those messages and render the user and assistant messages differently.`,
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a102",
          role: "user",
          content: "What happens when I send a new message?",
        },
      ],
      cursor: null,
      hasMore: false,
      loading: false,
    },

    "66bcb61d8e5e4c2b18a1a103": {
      messages: [
        {
          chatId: "66bcb61d8e5e4c2b18a1a103",
          role: "user",
          content:
            "Can you explain how React Router works in a chat application?",
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a103",
          role: "assistant",
          content: `React Router is useful in a chat application because it lets you represent the currently selected Chat directly in the URL.

For example, you can create a route like:

/chat/:chatId

If a user clicks a chat with the ID "12345", the URL becomes:

/chat/12345

Inside your Chatbox component, you can access that ID using useParams().

Once you have the chatId, you can send a request to your backend to fetch all messages belonging to that Chat.

The nice thing is that React Router performs client-side navigation, so the browser does not reload the whole page.

This means your sidebar can remain visible while only the chat content changes.

You can also use nested routes with an Outlet component so that WorkspacePage acts as a shared layout.

That structure works especially well for apps similar to ChatGPT, where the sidebar is persistent and the selected Chat changes frequently.`,
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a103",
          role: "user",
          content: "Should I store the messages in Redux or component state?",
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a103",
          role: "assistant",
          content: `Both approaches can work, and the better choice depends on how your application is structured.

If the messages are only needed inside the Chatbox component, local state is usually enough.

For example, you could use useState to store the currently loaded Chat messages.

However, Redux becomes useful if multiple parts of your application need access to the same chat data.

For example, your sidebar might need the latest message, Chat title, unread state, or streaming status.

Redux can also make it easier to cache previously opened Chats.

That way, when the user switches back to an older chat, you may already have its messages available.

For a small project, I would start with local state because it keeps things simple.

As the chat application grows, you can move the Chat state into Redux or use a data-fetching library such as TanStack Query.`,
        },
        {
          chatId: "66bcb61d8e5e4c2b18a1a103",
          role: "user",
          content: "Got it. So one Chat can have many messages?",
        },
      ],
      cursor: null,
      hasMore: false,
      loading: false,
    },
  },
};

const messageSlice = createSlice({
  name: "messages",

  initialState,

  reducers: {
    setMessages(state, action) {
      const { chatId, messages, cursor, hasMore } = action.payload;

      state.messagesByChat[chatId] = {
        messages,
        cursor,
        hasMore,
        loading: false,
      };
    },

    prependMessages(state, action) {
      const { chatId, messages, cursor, hasMore } = action.payload;

      state.messagesByChat[chatId].messages = [
        ...messages,
        ...state.messagesByChat[chatId].messages,
      ];

      state.messagesByChat[chatId].cursor = cursor;
      state.messagesByChat[chatId].hasMore = hasMore;
    },

    addMessage(state, action) {
      const { chatId, message } = action.payload;

      state.messagesByChat[chatId].messages.push(message);
    },
  },
});

export const { setMessages, prependMessages, addMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
