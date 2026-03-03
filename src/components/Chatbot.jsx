import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; // 🔑 Replace with your key

const SYSTEM_PROMPT = `You are a helpful assistant on Ashirwad's portfolio website.
Ashirwad is a full-stack developer skilled in React, Node.js, Python, and AI/ML.
He has built projects like a City Match app, a portfolio site, and various web apps.
Answer questions about his work, skills, experience, and projects in a friendly, concise way.
If you don't know something specific about Ashirwad, say so honestly.`;

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! 👋 I'm Ashirwad's AI assistant. Ask me anything about his work, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map(({ role, content }) => ({ role, content })),
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't get a response. Please try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Check your API key or network." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "58px", height: "58px", borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          border: "none", cursor: "pointer", fontSize: "24px",
          boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
          zIndex: 9999, display: "flex", alignItems: "center",
          justifyContent: "center", transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Chat with AI Assistant"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div style={{
          position: "fixed", bottom: "94px", right: "24px",
          width: "360px", height: "500px", borderRadius: "20px",
          background: "#0f0f1a", border: "1px solid rgba(99,102,241,0.3)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)", display: "flex",
          flexDirection: "column", zIndex: 9998,
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          overflow: "hidden", animation: "slideUp 0.25s ease",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            padding: "16px 18px", display: "flex", alignItems: "center", gap: "10px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>🤖</div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>
                Ashirwad's Assistant
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>
                Powered by Groq · LLaMA 3
              </div>
            </div>
            <div style={{
              marginLeft: "auto", width: "8px", height: "8px",
              borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80",
            }} />
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px",
            display: "flex", flexDirection: "column", gap: "10px",
            scrollbarWidth: "thin", scrollbarColor: "#333 transparent",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e1e30",
                  color: msg.role === "user" ? "white" : "#d1d5db",
                  fontSize: "14px", lineHeight: "1.5",
                  border: msg.role === "assistant" ? "1px solid rgba(99,102,241,0.2)" : "none",
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "12px 16px", borderRadius: "16px 16px 16px 4px",
                  background: "#1e1e30", border: "1px solid rgba(99,102,241,0.2)",
                  display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#6366f1", animation: `bounce 1.2s ease infinite`,
                      animationDelay: `${dot * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px", borderTop: "1px solid rgba(99,102,241,0.2)",
            display: "flex", gap: "8px", background: "#0f0f1a",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Ashirwad's work..."
              disabled={isLoading}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: "12px",
                border: "1px solid rgba(99,102,241,0.3)", background: "#1e1e30",
                color: "white", fontSize: "14px", outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.3)")}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: isLoading || !input.trim() ? "#2a2a40" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                fontSize: "18px", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}
            >➤</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}