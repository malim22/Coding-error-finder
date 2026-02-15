// CodeTips.jsx
import React from "react";

export default function CodeTips({ goToHome }) {
  const tips = [
    {
      title: "✅ Consistent Formatting",
      description:
        "Use consistent indentation (2 or 4 spaces) and semicolons where needed. This improves readability.",
    },
    {
      title: "💡 Meaningful Variable Names",
      description:
        "Use descriptive names for variables, functions, and constants. Avoid single letters except in loops.",
    },
    {
      title: "🛠️ Avoid Global Variables",
      description:
        "Keep your variables scoped properly using `let`, `const`, and functions. This reduces unexpected errors.",
    },
    {
      title: "🔍 Check for Undefined",
      description:
        "Always check if a variable exists before using it to prevent `ReferenceError`.",
    },
    {
      title: "📌 Modularize Code",
      description:
        "Split code into reusable functions or modules. Makes debugging and maintenance easier.",
    },
    {
      title: "⚡ Handle Errors",
      description:
        "Use `try/catch` blocks and proper error handling to avoid runtime crashes.",
    },
    {
      title: "📚 Comment Wisely",
      description:
        "Add short, meaningful comments to explain complex logic but avoid over-commenting obvious code.",
    },
    {
      title: "🧹 Clean Up",
      description:
        "Remove unused variables, functions, and imports to keep the codebase clean.",
    },
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px 10%",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      color: "#fff",
      transition: "all 0.4s ease-in-out",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "36px",
      fontWeight: "700",
      color: "#FF6B6B",
    },
    backButton: {
      padding: "10px 25px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#FF6B6B",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600,
      transition: "all 0.3s ease",
      marginBottom: "25px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    tipsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    tipCard: {
      flex: "1 1 300px",
      minWidth: "280px",
      backgroundColor: "#1f1f1f",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
      cursor: "default",
      color: "#fff",
    },
    tipCardHover: {
      transform: "translateY(-5px) scale(1.02)",
      boxShadow: "0 15px 35px rgba(0,0,0,0.45)",
    },
    tipTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#4A90E2",
      marginBottom: "10px",
    },
    tipDescription: {
      fontSize: "16px",
      color: "#ccc",
      lineHeight: 1.6,
    },
  };

  return (
    <div style={styles.page}>
      {/* Back button */}
      <button
        style={styles.backButton}
        onClick={goToHome} // <-- prop from App.jsx
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#FF4757")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#FF6B6B")
        }
      >
        ← Back
      </button>

      <h1 style={styles.header}>📝 JavaScript Coding Tips</h1>

      <div style={styles.tipsContainer}>
        {tips.map((tip, index) => (
          <div
            key={index}
            style={styles.tipCard}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, styles.tipCardHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(0) scale(1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              })
            }
          >
            <h3 style={styles.tipTitle}>{tip.title}</h3>
            <p style={styles.tipDescription}>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
