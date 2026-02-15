// AssistantWidget.jsx
import React, { useState, useEffect, useRef } from "react";

/**
 * Tiny AI assistant widget for dev help.
 * - Click the bubble to open a small chat.
 * - Sends question + optional current code to backend /api/assistant.
 * - Backend should proxy to OpenAI (see server.js below).
 *
 * Usage: <AssistantWidget getCurrentCode={() => codeString} />
 * getCurrentCode is optional. If provided, the assistant sends the snippet with the question.
 */

export default function AssistantWidget({ getCurrentCode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi — ask me about errors, languages, code style, or debugging tips." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendQuestion = async () => {
    const question = input.trim();
    if (!question) return;
    const codeSnippet = getCurrentCode ? getCurrentCode() : undefined;

    const userMsg = { role: "user", text: question, code: codeSnippet };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, code: codeSnippet }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || "Assistant failed");
      }

      const data = await resp.json();
      // expected { answer: "text" }
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  // small CSS-in-JS styles to be copy-paste friendly
  const styles = {
    widget: {
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 9999,
      fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    },
    bubble: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#4A90E2,#7B61FF)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      cursor: "pointer",
      fontSize: 26,
      border: "4px solid rgba(255,255,255,0.08)",
    },
    panel: {
      width: 420,
      maxWidth: "calc(100vw - 40px)",
      maxHeight: "70vh",
      background: "#0f1720",
      color: "#fff",
      borderRadius: 12,
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      marginBottom: 12,
    },
    header: {
      padding: 12,
      background: "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    messages: {
      padding: 12,
      overflowY: "auto",
      flex: 1,
      gap: 8,
      display: "flex",
      flexDirection: "column",
    },
    user: {
      alignSelf: "flex-end",
      background: "#1f2937",
      padding: "8px 10px",
      borderRadius: 8,
      maxWidth: "85%",
      color: "#fff",
      fontSize: 13,
    },
    assistant: {
      alignSelf: "flex-start",
      background: "#111827",
      padding: "8px 10px",
      borderRadius: 8,
      maxWidth: "85%",
      color: "#fff",
      fontSize: 13,
    },
    inputRow: {
      display: "flex",
      gap: 8,
      padding: 12,
      borderTop: "1px solid rgba(255,255,255,0.03)",
      background: "#081017",
    },
    input: {
      flex: 1,
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.06)",
      background: "#0b1220",
      color: "#fff",
      outline: "none",
      fontSize: 14,
    },
    sendBtn: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "none",
      background: "#4A90E2",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
    },
    smallNote: {
      fontSize: 12,
      color: "rgba(255,255,255,0.6)",
    },
  };

  return (
    <div style={styles.widget} ref={containerRef}>
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <div>
              <strong>BugFinder Assistant</strong>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                Ask about an error, language, or debugging tip
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  setMessages([{ role: "assistant", text: "Hi — ask me about errors, languages, code style, or debugging tips." }]);
                }}
                style={{ ...styles.sendBtn, padding: "6px 10px", background: "#6A6AFF" }}
                title="Reset chat"
              >
                Reset
              </button>
              <button onClick={() => setOpen(false)} style={{ ...styles.sendBtn, background: "#FF6B6B" }}>
                Close
              </button>
            </div>
          </div>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === "user" ? styles.user : styles.assistant}>
                <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                {m.code && (
                  <pre style={{ marginTop: 8, background: "#081018", padding: 8, borderRadius: 6, fontSize: 12, maxHeight: 180, overflow: "auto", color: "#9AE6B4" }}>
                    {m.code}
                  </pre>
                )}
              </div>
            ))}
            {loading && <div style={styles.assistant}>Thinking…</div>}
          </div>

          <div style={styles.inputRow}>
            <input
              placeholder="Describe your error or paste a short snippet..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendQuestion();
              }}
              style={styles.input}
            />
            <button onClick={sendQuestion} style={styles.sendBtn} disabled={loading}>
              {loading ? "..." : "Ask"}
            </button>
          </div>
          <div style={{ padding: 8, textAlign: "center" }}>
            <span style={styles.smallNote}>Tip: press Ctrl/Cmd+Enter to send. Your code snippet (if available) is sent with the question.</span>
          </div>
        </div>
      )}

      <div
        role="button"
        aria-label="Open assistant"
        title="Open assistant"
        onClick={() => setOpen((v) => !v)}
        style={styles.bubble}
      >
        💬
      </div>
    </div>
  );
}
