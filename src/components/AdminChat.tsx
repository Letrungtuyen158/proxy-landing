"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minimize2, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";

interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  text: string;
  timestamp: Date;
}

const STORAGE_KEY = "proxyforge-chat-history";

export default function AdminChat() {
  const { t, locale } = useLanguage();
  const { isOpen, openChat, closeChat, toggleChat } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatMessage[];
        setMessages(
          parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
        );
        setInitialized(true);
        return;
      } catch {
        /* ignore */
      }
    }
    setMessages([
      {
        id: "welcome",
        sender: "admin",
        text: t.chat.welcome,
        timestamp: new Date(),
      },
    ]);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "welcome") {
        return [{ ...prev[0], text: t.chat.welcome }];
      }
      return prev;
    });
  }, [locale, t.chat.welcome, initialized]);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, initialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, locale }),
        });

        const data = await res.json();
        const replyText =
          res.ok && data.reply
            ? data.reply
            : locale === "zh"
              ? "抱歉，暂时无法回复。请稍后再试。"
              : "Sorry, unable to reply right now. Please try again.";

        await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

        setMessages((prev) => [
          ...prev,
          {
            id: `admin-${Date.now()}`,
            sender: "admin",
            text: replyText,
            timestamp: new Date(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `admin-${Date.now()}`,
            sender: "admin",
            text:
              locale === "zh"
                ? "网络错误，请检查连接后重试。"
                : "Network error. Please check your connection and try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, locale]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-500/40 glow-purple"
            aria-label="Chat with admin"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold ring-2 ring-black">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-purple-600/10 px-4 py-3.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
                <Headphones className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-900 bg-green-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{t.chat.title}</div>
                <div className="text-xs text-zinc-400">{t.chat.subtitle}</div>
              </div>
              <button
                onClick={toggleChat}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Minimize chat"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={closeChat}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-br-md bg-violet-600 text-white"
                        : "rounded-bl-md bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    {msg.sender === "admin" && (
                      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-violet-400">
                        {t.chat.admin}
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-zinc-500"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-2.5">
              {t.chat.quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  disabled={isTyping}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-zinc-950/50 px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat.placeholder}
                disabled={isTyping}
                className="flex-1 rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition-all hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600"
                aria-label={t.chat.send}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
