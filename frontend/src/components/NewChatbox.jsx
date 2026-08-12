import { useParams } from "react-router-dom";
import { defaultFeatures } from "./landigPage/featureMenu.data";
import { useEffect, useState } from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const messages = [
  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "user",
    content: "Can you explain how React Router works in a chat application?",
  },
  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "assistant",
    content: `React Router is useful in a chat application because it lets you represent the currently selected conversation directly in the URL.

For example, you can create a route like:

/chat/:chatId

If a user clicks a conversation with the ID "12345", the URL becomes:

/chat/12345

Inside your Chatbox component, you can access that ID using useParams().

Once you have the chatId, you can send a request to your backend to fetch all messages belonging to that conversation.

The nice thing is that React Router performs client-side navigation, so the browser does not reload the whole page.

This means your sidebar can remain visible while only the chat content changes.

You can also use nested routes with an Outlet component so that WorkspacePage acts as a shared layout.

That structure works especially well for apps similar to ChatGPT, where the sidebar is persistent and the selected conversation changes frequently.`,
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

Whenever the user clicks another conversation, React Router updates the URL and the chatId value changes.

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
  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "assistant",
    content: `Both approaches can work, and the better choice depends on how your application is structured.

If the messages are only needed inside the Chatbox component, local state is usually enough.

For example, you could use useState to store the currently loaded conversation messages.

However, Redux becomes useful if multiple parts of your application need access to the same chat data.

For example, your sidebar might need the latest message, conversation title, unread state, or streaming status.

Redux can also make it easier to cache previously opened conversations.

That way, when the user switches back to an older chat, you may already have its messages available.

For a small project, I would start with local state because it keeps things simple.

As the chat application grows, you can move the conversation state into Redux or use a data-fetching library such as TanStack Query.`,
  },

  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "user",
    content: "What happens when I send a new message?",
  },
  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "assistant",
    content: `When the user sends a new message, you normally create a new Message document using the current chatId.

The request might contain the chatId, role, and message content.

Your backend saves the user's message first.

Then you can send the conversation history to your AI service to generate a response.

After receiving the AI response, save another Message document with the role set to "assistant".

Both messages should use the same chatId.

Because they share the same conversation ID, you can later retrieve the entire conversation with a single query.

You should also consider updating the Conversation document's updatedAt timestamp whenever a new message is created.

That makes it easy to sort the sidebar so the most recently active conversations appear at the top.

If this is the first message in a new conversation, you could also generate a short title and update the Conversation title field.`,
  },

  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "user",
    content: "Got it. So one conversation can have many messages?",
  },
  {
    chatId: "66bcb61d8e5e4c2b18a1a101",
    role: "assistant",
    content: `Exactly.

Your Conversation collection stores the high-level information about a chat, such as its title, owner, creation date, and last updated time.

Your Message collection stores the actual conversation content.

Every Message document contains a chatId that points back to the Conversation document.

That creates a one-to-many relationship:

One Conversation → Many Messages

This is a good structure because you avoid putting a potentially huge messages array inside a single Conversation document.

It also makes pagination easier later.

For example, if a conversation contains hundreds of messages, you can fetch only the newest 30 messages instead of loading the entire conversation.

Your current schema is therefore a solid starting point for building the chat history system.`,
  },
];

function NewChatbox() {
  const { chatId } = useParams();
  const [chats, setChats] = useState(null);
  console.log("chatId : ", chatId);
  useEffect(() => {
    if (!chatId) {
      setChats(null);
      return;
    }

    setChats(messages);
    console.log("Load chat:", messages);
  }, [chatId]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {chats?.length >= 1 ? (
        <div className="flex h-screen flex-col p-4">
          <div className="scrollbar-width:none h-full min-h-0 w-full max-w-4xl overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex min-h-full flex-col justify-end space-y-6">
              {chats.map((chat, index) => {
                const isAssistant = ["assistant", "ai"].includes(chat.role);

                return (
                  <div
                    key={`${chat.chatId}-${index}`}
                    className={`flex w-full ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`rounded-card border p-3 ${
                        isAssistant
                          ? "border-chat-ai-border bg-chat-ai mb-8 w-full"
                          : "border-chat-user-border bg-chat-user w-1/2"
                      }`}
                    >
                      {chat.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative w-full">
            <textarea
              placeholder="Type your ideas here..."
              className="rounded-card border-secondary bg-surface-raised text-text placeholder:text-muted focus:border-accent h-24 w-full resize-none border p-4 pr-14 transition-colors outline-none"
            />

            <button
              type="button"
              aria-label="Send message"
              className="bg-accent text-canvas hover:bg-accent-hover absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full transition-colors"
            >
              <IoArrowForwardCircleSharp size={36} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-3xl flex-col items-center justify-center px-4 pb-[8%] sm:p-6">
          <div className="rounded-pill border-warm text-warm border bg-orange-400/10 px-4 py-1 text-sm">
            🧡 Loved by customers
          </div>

          <h1 className="font-grotesk text-text mt-6 w-full text-center text-3xl font-medium tracking-tight sm:text-4xl">
            Build, Run & Grow your business
          </h1>

          <textarea
            placeholder="Type your ideas here..."
            className="rounded-card border-secondary bg-surface-raised text-text placeholder:text-text-muted focus:border-accent mt-6 h-36 w-full resize-none border p-4 transition-colors outline-none"
          />

          <div className="scrollbar-width:none mt-4 flex w-full gap-2 overflow-x-auto pb-1 whitespace-nowrap [&::-webkit-scrollbar]:hidden">
            {defaultFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <button
                  key={feature.id}
                  type="button"
                  className="rounded-pill bg-surface text-text-soft hover:border-border-strong hover:bg-surface-hover hover:text-text inline-flex shrink-0 items-center gap-2 border-[0.5px] border-white/20 px-3 py-1.5 text-sm transition-colors"
                >
                  <Icon className="size-4" />
                  <span>{feature.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewChatbox;
