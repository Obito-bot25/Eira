"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";

const starterMessages = [
  {
    role: "assistant",
    text: "Hi, I’m EIRA 🌿. I’m here to listen, support, and help you navigate stress or study pressures. What’s on your mind today?",
  },
];

const SUPPORTED_LANGUAGES = [
  "English",
  "Hindi",
  "Urdu",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Punjabi",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState("English");
  const endRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      textareaRef.current?.focus();
    }
  }, [open]);

  async function sendMessage() {
    const text = message.trim();
    if (!text || loading) return;

    setMessage("");
    setErrorMessage("");
    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language,
          history: nextMessages.slice(-10),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const errorText =
          data?.error ||
          "EIRA is temporarily unavailable. Please try again in a moment.";
        setErrorMessage(errorText);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: errorText,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data?.reply ||
            "I received your message. Take a deep breath and share a bit more.",
        },
      ]);
    } catch {
      const connError =
        "EIRA is temporarily unavailable. Please try again in a moment.";
      setErrorMessage(connError);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: connError,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {!open && (
        <button
          className={styles.floatingLauncher}
          onClick={() => setOpen(true)}
          aria-label="Open EIRA AI Chatbot"
        >
          <span className={styles.launcherIcon}>💬</span>
          <span>TALK TO EIRA</span>
          <span className={styles.launcherDot} />
        </button>
      )}

      {open && (
        <section
          className={styles.widget}
          aria-label="EIRA AI Mental Wellness Assistant"
        >
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.identity}>
              <div className={styles.avatarBadge}>🌿</div>
              <div className={styles.headerText}>
                <div className={styles.headerTitle}>
                  <span>EIRA AI</span>
                  <span className={styles.localBadge}>AI ASSISTANT</span>
                </div>
                <span className={styles.headerSub}>
                  Student Mental Wellness Assistant
                </span>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </header>

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <span className={styles.privacyTag}>
              🔒 PRIVATE BY DESIGN
            </span>
            <div className={styles.langSelector}>
              <label htmlFor="eira-lang-select">LANG:</label>
              <select
                id="eira-lang-select"
                className={styles.langSelect}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {SUPPORTED_LANGUAGES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Messages Feed */}
          <div className={styles.messages}>
            {messages.map((item, index) => {
              const isUser = item.role === "user";
              return (
                <div
                  key={`${item.role}-${index}`}
                  className={`${styles.messageRow} ${
                    isUser ? styles.messageRowUser : styles.messageRowAssistant
                  }`}
                >
                  <span className={styles.senderTag}>
                    {isUser ? "YOU" : "EIRA 🌿"}
                  </span>
                  <div
                    className={`${styles.bubble} ${
                      isUser ? styles.userBubble : styles.assistantBubble
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div
                className={`${styles.messageRow} ${styles.messageRowAssistant}`}
              >
                <span className={styles.senderTag}>EIRA 🌿</span>
                <div className={styles.typingBubble}>
                  <span>EIRA is thinking carefully</span>
                  <span className={styles.typingBlock} />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.inputControls}>
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask EIRA in ${language} (Enter to send)...`}
                rows={2}
                aria-label="Message to EIRA"
              />
              <button
                className={styles.sendBtn}
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className={styles.disclaimer}>
            EIRA provides supportive guidance, not clinical diagnosis or emergency care.
          </div>
        </section>
      )}
    </>
  );
}
