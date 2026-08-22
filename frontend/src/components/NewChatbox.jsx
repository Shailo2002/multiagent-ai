import { useNavigate, useParams } from "react-router-dom";
import { defaultFeatures } from "./landigPage/featureMenu.data";
import { useEffect, useRef, useState } from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";
import { getMessages } from "../features/getMessages";
import {
  addMessageData,
  prependMessageData,
  setGenerating,
  setMessageData,
  setMessageLoading,
} from "../redux/messagesSlice";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AiMarkdown from "./AiMarkdown";

function NewChatbox() {
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const messageData = useSelector((state) =>
    chatId ? state.message.messagesByChat[chatId] : null,
  );
  const messages = messageData?.messages ?? [];
  const isGenerating = messageData?.isGenerating ?? false;
  const cursor = messageData?.cursor ?? null;
  const hasMore = messageData?.hasMore ?? false;
  const loading = messageData?.loading ?? false;
  const lastMessageId = messages.at(-1)?._id;
  console.log("messageData : ", messageData);

  const handleSendMessage = async () => {
    const message = input.trim();

    if (!message || isGenerating) return;

    setInput("");

    let responseChatId = chatId;

    try {
      const saveResponse = await api.post("/api/chat/send-message", {
        content: message,
        chatId: chatId || undefined,
      });

      const {
        chatId: returnedChatId,
        isNewChat,
        userMessage,
      } = saveResponse.data.data;

      responseChatId = returnedChatId;

      if (isNewChat) {
        dispatch(
          setMessageData({
            chatId: responseChatId,
            messages: [userMessage],
            cursor: null,
            hasMore: false,
          }),
        );

        navigate(`/chat/${responseChatId}`);
      } else {
        dispatch(
          addMessageData({
            chatId: responseChatId,
            message: userMessage,
          }),
        );
      }

      dispatch(
        setGenerating({
          chatId: responseChatId,
          isGenerating: true,
        }),
      );

      const agentResponse = await api.post("/api/agent/agentcall", {
        message,
        chatId: responseChatId,
      });

      const { assistantMessage } = agentResponse.data.data;

      dispatch(
        addMessageData({
          chatId: responseChatId,
          message: assistantMessage,
        }),
      );
    } catch (error) {
      console.error("Agent route error:", error);

      setInput(message);
    } finally {
      if (responseChatId) {
        dispatch(
          setGenerating({
            chatId: responseChatId,
            isGenerating: false,
          }),
        );
      }
    }
  };

  const loadOlderMessages = async () => {
    if (!chatId || !hasMore || loading || !cursor) return;

    const container = scrollContainerRef.current;

    const previousScrollHeight = container?.scrollHeight ?? 0;
    const previousScrollTop = container?.scrollTop ?? 0;

    try {
      dispatch(
        setMessageLoading({
          chatId,
          loading: true,
        }),
      );

      const response = await getMessages({ chatId, cursor });

      dispatch(
        prependMessageData({
          chatId,
          messages: [...response.data].reverse(),
          cursor: response.cursor,
          hasMore: response.hasMore,
        }),
      );

      requestAnimationFrame(() => {
        if (!container) return;

        const newScrollHeight = container.scrollHeight;
        const heightDifference = newScrollHeight - previousScrollHeight;

        container.scrollTop = previousScrollTop + heightDifference;
      });
    } finally {
      dispatch(
        setMessageLoading({
          chatId,
          loading: false,
        }),
      );
    }
  };

  const handleKeyDown = async (event) => {
    try {
      if (event.key !== "Enter" || event.shiftKey) return;
      event.preventDefault();
      await handleSendMessage();
    } catch (error) {
      console.log("error while getting ai response : ", error);
    }
  };

  const handleScroll = (event) => {
    const container = event.currentTarget;
    // console.log("scrolling bar : ", container.scrollTop);

    if (container.scrollTop <= 100) {
      loadOlderMessages();
    }
  };

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const existingMessages = messageData?.messages;

    if (existingMessages?.length) {
      return;
    }

    const handleGetMessages = async () => {
      try {
        const response = await getMessages({
          chatId,
          cursor,
        });

        console.log("response : ", response);

        const fetchedMessages = response?.data ?? [];

        if (fetchedMessages.length === 0) {
          navigate("/");
          return;
        }

        dispatch(
          setMessageData({
            chatId,
            messages: [...response.data].reverse(),
            cursor: response.cursor,
            hasMore: response.hasMore,
          }),
        );
      } catch (error) {
        console.error("Error while getting messages:", error);
      }
    };

    handleGetMessages();
  }, [chatId, dispatch, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatId, lastMessageId]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {messages?.length >= 1 ? (
        <div className="flex h-screen w-full flex-col p-4">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="scrollbar-width:none h-full min-h-0 w-full justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-end space-y-6">
              {messages?.map((chat, index) => {
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
                      {isAssistant ? (
                        <AiMarkdown content={chat.content} />
                      ) : (
                        <div className="text-text whitespace-pre-wrap">
                          {chat.content}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {isGenerating && (
                <div className="flex w-full justify-start">
                  <div className="text-text-muted px-3 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-current" />

                      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:150ms]" />

                      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-4xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your ideas here..."
              className="rounded-card border-secondary bg-surface-raised text-text placeholder:text-muted focus:border-accent h-24 w-full resize-none border p-4 pr-14 transition-colors outline-none"
            />

            <button
              onClick={handleSendMessage}
              disabled={isGenerating}
              type="button"
              aria-label="Send message"
              className="bg-accent text-canvas hover:bg-accent-hover absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="relative w-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your ideas here..."
              className="rounded-card border-secondary bg-surface-raised text-text placeholder:text-text-muted focus:border-accent mt-6 h-36 w-full resize-none border p-4 transition-colors outline-none"
            />

            <button
              onClick={handleSendMessage}
              disabled={isGenerating}
              type="button"
              aria-label="Send message"
              className="bg-accent text-canvas hover:bg-accent-hover absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IoArrowForwardCircleSharp size={36} />
            </button>
          </div>

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
