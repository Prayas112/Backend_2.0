import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import remarkGfm from "remark-gfm";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {
  const chat = useChat();

  const [chatInput, setChatInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [searchMode, setSearchMode] = useState("Pro");
  const [copiedId, setCopiedId] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const chats = useSelector((state) => state.chat?.chats || {});
  const currentChatId = useSelector((state) => state.chat?.currentChatId);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  /* ---------------- INITIALIZE ---------------- */

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  /* ---------------- CURRENT CHAT ---------------- */

  const currentMessages = chats[currentChatId]?.messages || [];

  /* ---------------- SOURCES ---------------- */

  const currentSources = useMemo(() => {
    const sources = [];

    currentMessages.forEach((message) => {
      if (message.role === "ai" && message.sources) {
        sources.push(...message.sources);
      }
    });

    return sources;
  }, [currentMessages]);

  /* ---------------- SCROLL ---------------- */

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, [currentMessages.length]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setShowScrollButton(distanceFromBottom > 300);
  };

  /* ---------------- SEND MESSAGE ---------------- */

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage) return;

    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
    });

    setChatInput("");

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  /* ---------------- OPEN CHAT ---------------- */

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
    setSidebarOpen(false);

    setTimeout(() => {
      scrollToBottom(false);
    }, 100);
  };

  /* ---------------- SUGGESTION ---------------- */

  const handleSuggestion = (text) => {
    setChatInput(text);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  /* ---------------- COPY ---------------- */

  const handleCopy = async (content, id) => {
    try {
      await navigator.clipboard.writeText(content);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  /* ---------------- REGENERATE ---------------- */

  const handleRegenerate = (messageIndex) => {
    const previousUserMessage = [...currentMessages]
      .slice(0, messageIndex)
      .reverse()
      .find((message) => message.role === "user");

    if (!previousUserMessage) return;

    chat.handleSendMessage({
      message: previousUserMessage.content,
      chatId: currentChatId,
    });
  };

  /* ---------------- NEW CHAT ---------------- */

  const createNewChat = () => {
    window.location.reload();
  };

  /* ---------------- DELETE UI ---------------- */

  const handleDeleteUI = (event) => {
    event.stopPropagation();

    // Backend connect baad mein karenge.
    console.log("Delete chat clicked");
  };

  /* ---------------- MARKDOWN ---------------- */

  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-6 text-2xl font-semibold text-white">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-3 mt-5 text-xl font-semibold text-white">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-lg font-semibold text-white">{children}</h3>
    ),

    p: ({ children }) => (
      <p className="mb-4 leading-7 text-white/75">{children}</p>
    ),

    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-white/75">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-white/75">
        {children}
      </ol>
    ),

    li: ({ children }) => <li className="leading-7">{children}</li>,

    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-white/20 pl-4 italic text-white/50">
        {children}
      </blockquote>
    ),

    code: ({ inline, children }) => {
      if (inline) {
        return (
          <code className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-sm text-white/90">
            {children}
          </code>
        );
      }

      return (
        <code className="block overflow-x-auto rounded-xl bg-black/40 p-4 text-sm leading-6 text-white/80">
          {children}
        </code>
      );
    },

    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-xl border border-white/[0.06] bg-black/40">
        {children}
      </pre>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
      >
        {children}
      </a>
    ),

    hr: () => <hr className="my-5 border-white/[0.08]" />,

    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th className="border-b border-white/[0.08] bg-white/[0.04] px-4 py-3 text-left font-semibold text-white">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border-b border-white/[0.06] px-4 py-3 text-white/70">
        {children}
      </td>
    ),
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#080808] text-white">
      {/* MOBILE OVERLAY */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}

      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : undefined,
        }}
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col
          border-r border-white/[0.06] bg-[#0b0b0b]
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}

        <div className="flex h-[72px] items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v18" />
                <path d="M3 12h18" />
                <path d="m5 5 14 14" />
                <path d="m19 5-14 14" />
              </svg>
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Perplexity
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-white/40 hover:bg-white/[0.05] hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* NEW CHAT */}

        <div className="px-4 pb-4">
          <button
            onClick={createNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            New Thread
          </button>
        </div>

        {/* SEARCH */}

        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-white/30"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              placeholder="Search threads"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            />

            <span className="rounded-md border border-white/[0.08] px-1.5 py-0.5 text-[9px] text-white/25">
              /
            </span>
          </div>
        </div>

        {/* CHATS */}

        <div className="flex-1 overflow-y-auto px-3 pb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
            Your Threads
          </div>

          <div className="space-y-1">
            {Object.values(chats || {}).map((item, index) => {
              const chatId = item.id || item._id;
              const isActive = chatId === currentChatId;

              return (
                <motion.div
                  key={chatId || index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.035,
                  }}
                  className={`group relative rounded-xl transition ${
                    isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeThread"
                      className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-white"
                    />
                  )}

                  {/* CHAT BUTTON */}

                  <button
                    type="button"
                    onClick={() => openChat(chatId)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 pr-11 text-left transition ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/90"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold ${
                        isActive
                          ? "bg-white text-black"
                          : "bg-white/[0.06] text-white/40"
                      }`}
                    >
                      {item.title?.charAt(0)?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.title || "Untitled chat"}
                      </p>

                      <p className="mt-0.5 text-[9px] text-white/20">
                        Conversation
                      </p>
                    </div>

                    {isActive && (
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    )}
                  </button>

                  {/* DELETE BUTTON */}

                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDeleteUI}
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-white/20 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                    title="Delete chat"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v5" />
                      <path d="M14 11v5" />
                    </svg>
                  </motion.button>
                </motion.div>
              );
            })}

            {Object.values(chats || {}).length === 0 && (
              <div className="px-3 py-8 text-center">
                <p className="text-xs text-white/20">No conversations yet</p>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR BOTTOM */}

        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-xs font-semibold">
              P
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white/80">
                Account
              </p>

              <p className="text-[10px] text-white/25">Personal workspace</p>
            </div>

            <button className="ml-auto text-white/30 hover:text-white">
              ⋯
            </button>
          </div>
        </div>
      </motion.aside>

      {/* MAIN */}

      <main className="relative flex min-w-0 flex-1 flex-col">
        {/* HEADER */}

        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.05] px-4 md:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-white/50 hover:bg-white/[0.05] hover:text-white lg:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>

            <div>
              <p className="text-sm font-medium text-white/80">
                {chats[currentChatId]?.title || "New Thread"}
              </p>

              <p className="text-[10px] text-white/25">
                {currentChatId ? "Conversation" : "Ask anything"}
              </p>
            </div>
          </div>

          {/* MODE */}

          <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.025] p-1">
            {["Fast", "Pro"].map((mode) => (
              <button
                key={mode}
                onClick={() => setSearchMode(mode)}
                className={`rounded-lg px-3 py-1.5 text-xs transition ${
                  searchMode === mode
                    ? "bg-white text-black"
                    : "text-white/35 hover:text-white/70"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </header>

        {/* MESSAGES */}

        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto w-full max-w-4xl px-4 pb-40 pt-8 md:px-8 md:pt-12">
            {/* EMPTY STATE */}

            {currentMessages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[55vh] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M12 3v18" />
                    <path d="M3 12h18" />
                    <path d="m5 5 14 14" />
                    <path d="m19 5-14 14" />
                  </svg>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Where knowledge begins.
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/35">
                  Ask a question, explore an idea, or start a conversation.
                </p>

                {/* SUGGESTIONS */}

                <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                  {[
                    "Explain how React hooks work",
                    "Give me a MERN project idea",
                    "Explain Redux in simple words",
                    "How does JWT authentication work?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-left text-xs text-white/45 transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white/80"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* MESSAGES */}

            <div className="space-y-8">
              {currentMessages.map((message, index) => {
                const messageId =
                  message._id || message.id || `${index}-${message.role}`;

                const isUser = message.role === "user";

                return (
                  <motion.div
                    key={messageId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`group flex gap-4 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 3v18" />
                          <path d="M3 12h18" />
                          <path d="m5 5 14 14" />
                          <path d="m19 5-14 14" />
                        </svg>
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] md:max-w-[78%] ${
                        isUser
                          ? "rounded-2xl bg-white/[0.08] px-4 py-3"
                          : "min-w-0 flex-1"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-sm leading-7 text-white/90">
                          {message.content}
                        </p>
                      ) : (
                        <div className="text-sm">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* AI ACTIONS */}

                      {!isUser && (
                        <div className="mt-3 flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                          <button
                            onClick={() =>
                              handleCopy(message.content, messageId)
                            }
                            className="rounded-lg p-2 text-white/25 transition hover:bg-white/[0.05] hover:text-white/70"
                            title="Copy"
                          >
                            {copiedId === messageId ? (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path d="m5 12 4 4L19 6" />
                              </svg>
                            ) : (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <rect
                                  width="13"
                                  height="13"
                                  x="8"
                                  y="8"
                                  rx="2"
                                />
                                <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                              </svg>
                            )}
                          </button>

                          <button
                            onClick={() => handleRegenerate(index)}
                            className="rounded-lg p-2 text-white/25 transition hover:bg-white/[0.05] hover:text-white/70"
                            title="Regenerate"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4" />
                              <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* SCROLL BUTTON */}

        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollToBottom()}
              className="absolute bottom-32 left-1/2 z-20 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-[#151515] text-white/60 shadow-xl transition hover:text-white"
            >
              ↓
            </motion.button>
          )}
        </AnimatePresence>

        {/* SOURCES */}

        <AnimatePresence>
          {sourcesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-28 right-6 z-30 w-[320px] rounded-2xl border border-white/[0.08] bg-[#111111] p-4 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium">Sources</p>

                <button
                  onClick={() => setSourcesOpen(false)}
                  className="text-white/30 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {currentSources.length > 0 ? (
                <div className="space-y-2">
                  {currentSources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-white/[0.04] p-3 text-xs text-white/60 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      {source.title || source.url}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/25">No sources available.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT */}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080808] via-[#080808] to-transparent px-4 pb-5 pt-12 md:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.form
              onSubmit={handleSubmitMessage}
              className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111111] shadow-[0_10px_60px_rgba(0,0,0,0.35)]"
            >
              <textarea
                ref={textareaRef}
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmitMessage(event);
                  }
                }}
                rows={1}
                placeholder="Ask anything..."
                className="max-h-40 min-h-[58px] w-full resize-none bg-transparent px-4 pb-14 pt-4 text-sm leading-6 text-white outline-none placeholder:text-white/25"
              />

              {/* INPUT BOTTOM */}

              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex h-8 items-center gap-2 rounded-lg px-2.5 text-xs text-white/30 transition hover:bg-white/[0.05] hover:text-white/70"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Attach
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourcesOpen((value) => !value)}
                    className={`flex h-8 items-center gap-2 rounded-lg px-2.5 text-xs transition ${
                      sourcesOpen
                        ? "bg-white/[0.08] text-white"
                        : "text-white/30 hover:bg-white/[0.05] hover:text-white/70"
                    }`}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                    Sources
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white/20"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 19V5" />
                    <path d="m6 11 6-6 6 6" />
                  </svg>
                </button>
              </div>
            </motion.form>

            <p className="mt-2 text-center text-[9px] text-white/15">
              AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
