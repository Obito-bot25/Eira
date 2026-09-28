"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Ai.module.css";
import { 
  FiSend, 
  FiPaperclip, 
  FiLink, 
  FiMic, 
  FiTrash2, 
  FiGlobe, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiChevronDown
} from "react-icons/fi";

export default function AiChatbotPage() {
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I’m EIRA, your confidential mental wellness companion. Whether you're feeling overwhelmed by college deadlines, dealing with anxiety, or just want to vent without judgment, I'm here for you. How are you feeling right now?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [resourceModal, setResourceModal] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = [
    "English",
    "Hindi",
    "Bengali",
    "Marathi",
    "Telugu",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Punjabi",
    "Kashmiri"
  ];

  const suggestedPrompts = [
    "I’m feeling anxious",
    "I can’t focus",
    "I’m overwhelmed",
    "I feel lonely",
    "I just want to talk"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function handleSend(textToSend) {
    const text = (textToSend || message).trim();
    if (!text || loading) return;

    setMessage("");
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
            "I’m here to support you. Let’s take a deep breath together.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "EIRA is temporarily unavailable. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleClearChat = () => {
    if (confirm("Reset conversation?")) {
      setMessages([
        {
          role: "assistant",
          text: "Conversation reset. I'm right here whenever you'd like to share what's on your mind."
        }
      ]);
    }
  };

  return (
    <>
      <main className={styles.page}>
        {/* Main Conversation Header */}
        <section className={styles.headerCard}>
          <div className={styles.headerLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.liveBadge}>● AUTOMATED AI</span>
              <span className={styles.privacyBadge}>PRIVATE BY DESIGN</span>
            </div>
            <h1 className={styles.title}>
              EIRA <span>AI</span>
            </h1>
            <p className={styles.subtitle}>
              YOUR PRIVATE SPACE TO TALK.
            </p>
          </div>

          <div className={styles.headerControls}>
            {/* Language Dropdown */}
            <div className={styles.langSelectorWrapper}>
              <button 
                type="button" 
                className={styles.langButton}
                onClick={() => setShowLanguages(!showLanguages)}
              >
                <FiGlobe size={16} />
                <span>{language}</span>
                <FiChevronDown size={14} />
              </button>

              {showLanguages && (
                <ul className={styles.langDropdown}>
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className={language === lang ? styles.selectedLang : ""}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguages(false);
                      }}
                    >
                      {lang} {language === lang && "✓"}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button 
              type="button" 
              className={styles.clearBtn} 
              onClick={handleClearChat}
              title="Clear chat"
            >
              <FiTrash2 size={16} />
              <span>RESET</span>
            </button>
          </div>
        </section>

        {/* Suggested Prompts Strip */}
        <section className={styles.promptsSection}>
          <span className={styles.promptsLabel}>SUGGESTED PROMPTS:</span>
          <div className={styles.promptChips}>
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.promptChip}
                onClick={() => handleSend(prompt)}
              >
                “{prompt}” →
              </button>
            ))}
          </div>
        </section>

        {/* Chat Layout: Sidebar + Main Chat Panel */}
        <div className={styles.chatLayout}>
          {/* Left Info / Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3>💡 GROUNDING TIPS</h3>
              <ul className={styles.tipsList}>
                <li><strong>4-7-8 Breathing:</strong> Inhale for 4s, hold for 7s, exhale for 8s.</li>
                <li><strong>5-4-3-2-1 Technique:</strong> Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.</li>
                <li><strong>Thought Defusion:</strong> Thoughts are just mental events, not absolute facts.</li>
              </ul>
            </div>

            <div className={styles.sidebarCrisisBox}>
              <div className={styles.crisisHeader}>
                <FiAlertTriangle size={18} />
                <strong>Need Urgent Help?</strong>
              </div>
              <p>For critical crises or self-harm concerns, reach out immediately:</p>
              <div className={styles.helplineList}>
                <span>📞 Tele-MANAS: 14416</span>
                <span>📞 Emergency: 112</span>
              </div>
            </div>
          </aside>

          {/* Main Messages & Input Area */}
          <section className={styles.chatContainer}>
            {/* Messages Scroll Area */}
            <div className={styles.messagesArea}>
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={idx}
                    className={`${styles.messageWrapper} ${isUser ? styles.userWrapper : styles.assistantWrapper}`}
                  >
                    <div className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}>
                      <div className={styles.bubbleHeader}>
                        <span className={styles.roleTag}>
                          {isUser ? "🙋 YOU" : "🌿 EIRA AI"}
                        </span>
                      </div>
                      <p className={styles.bubbleText}>{m.text}</p>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className={`${styles.messageWrapper} ${styles.assistantWrapper}`}>
                  <div className={`${styles.messageBubble} ${styles.assistantBubble}`}>
                    <div className={styles.typingIndicator}>
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingText}>EIRA is thinking carefully...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Actions Bar */}
            <div className={styles.inputArea}>
              <div className={styles.inputRow}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={`Write your message in ${language} (Press Enter to send)...`}
                  className={styles.input}
                  rows={2}
                />
                <button
                  type="button"
                  className={styles.sendBtn}
                  onClick={() => handleSend()}
                  disabled={loading || !message.trim()}
                  aria-label="Send message"
                >
                  <FiSend size={18} />
                  <span>SEND</span>
                </button>
              </div>

              <div className={styles.inputFooter}>
                <div className={styles.quickTools}>
                  <button 
                    type="button" 
                    className={styles.toolBtn}
                    onClick={() => setResourceModal(true)}
                  >
                    <FiLink size={14} />
                    <span>Support Resources</span>
                  </button>
                  <button 
                    type="button" 
                    className={styles.toolBtn}
                    onClick={() => alert("Attachment feature is ready for demo. File uploads are sanitized for student privacy.")}
                  >
                    <FiPaperclip size={14} />
                    <span>Attach</span>
                  </button>
                </div>
                <span className={styles.encryptionNotice}>
                  🔒 Zero ad tracking • Student-first privacy
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Resources Modal */}
        {resourceModal && (
          <div className={styles.modalOverlay} onClick={() => setResourceModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>STUDENT WELLNESS RESOURCES</h3>
                <button type="button" onClick={() => setResourceModal(false)}>✕</button>
              </div>
              <ul className={styles.resourceList}>
                <li>
                  <strong>Campus Counseling Center:</strong> Free sessions available Monday–Friday.
                </li>
                <li>
                  <strong>Kiran Mental Health Helpline:</strong> 1800-599-0019 (24/7).
                </li>
                <li>
                  <strong>Tele-MANAS Comprehensive Care:</strong> 14416 (Toll-free, multi-lingual).
                </li>
                <li>
                  <strong>Peer Support Circles:</strong> Check our Campus Peer Groups tab for safe spaces.
                </li>
              </ul>
              <button 
                type="button" 
                className={styles.closeModalBtn}
                onClick={() => setResourceModal(false)}
              >
                GOT IT
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

