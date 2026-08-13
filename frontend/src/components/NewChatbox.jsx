import { useNavigate, useParams } from "react-router-dom";
import { defaultFeatures } from "./landigPage/featureMenu.data";
import { useEffect, useRef, useState } from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

function NewChatbox() {
  const bottomRef = useRef(null);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const chatsMessage = useSelector(
    (state) => state.messages.messagesByChat[chatId],
  );
  console.log("chatId : ", chatId);
  console.log("messages : ", chatsMessage);
  useEffect(() => {
    if (!chatId) {
      navigate("/");
      return;
    }
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatsMessage]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {chatsMessage?.messages?.length >= 1 ? (
        <div className="flex h-screen flex-col p-4">
          <div className="scrollbar-width:none h-full min-h-0 w-full max-w-4xl overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex min-h-full flex-col justify-end space-y-6">
              {chatsMessage?.messages?.map((chat, index) => {
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
              <div ref={bottomRef} />
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
