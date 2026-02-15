// HomePage.jsx
import React from "react";
import codeImg from "./code_image.png"; // Make sure this image is in your src folder

export default function HomePage({ onStart, onTips }) {
  const styles = {
    page: {
      width: "100%",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heroSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      maxWidth: "1200px",
      padding: "60px 0",
      gap: "50px",
    },
    heroContent: { maxWidth: "600px" },
    heroTitle: {
      fontSize: "52px",
      color: "#68287dff",
      marginBottom: "20px",
      letterSpacing: "2px",
    },
    heroText: {
      fontSize: "20px",
      color: "#744848ff",
      marginBottom: "30px",
      lineHeight: "1.6",
    },
    heroButton: {
      padding: "12px 28px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backgroundColor: "#FF6B6B", // default color
      color: "#fff",
    },
    heroImage: { maxWidth: "450px" },
    infoSection: {
      padding: "60px 20px",
      textAlign: "center",
      background: "linear-gradient(180deg, #f9f9f9, #e8e8ff)",
      width: "100%",
    },
    infoTitle: { fontSize: "40px", color: "#6A1B9A", marginBottom: "25px" },
    infoText: { fontSize: "18px", color: "#555", marginBottom: "50px", lineHeight: "1.5" },
    features: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: "30px",
    },
    featureCard: {
      background: "linear-gradient(145deg, #ffffff, #f0e6ff)",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      width: "280px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    featureTitle: { fontSize: "22px", color: "#6A1B9A", marginBottom: "12px" },
    featureText: { fontSize: "16px", color: "#444" },
    footer: {
      padding: "20px",
      textAlign: "center",
      fontSize: "14px",
      color: "#0e0909ff",
      fontWeight: "500",
      background: "#baa2beff",
      width: "100%",
    },
    buttonContainer: {
      display: "flex",
      gap: "35px",        // space between buttons
      marginTop: "30px",  // space from title or content above
      justifyContent: "center",
      margin: "0 12px", // center buttons horizontally
    },
    //   footer: {
    //   marginTop: "60px",
    //   padding: "25px 20px",
    //   background: "rgba(255, 255, 255, 0.8)",
    //   borderTop: "1px solid #e5e5e5",
    //   textAlign: "center",
    //   backdropFilter: "blur(10px)",
    //   boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
    //   fontFamily: "Inter, sans-serif",
    // },

    footerLinks: {
      marginTop: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
    },

    footerLink: {
      color: "#0070f3",
      textDecoration: "none",
      fontSize: "15px",
      transition: "0.25s",
      fontWeight: 500,
    },

    footerLinkHover: {
      textDecoration: "underline",
    },

    separator: {
      color: "#555",
      fontSize: "16px",
    },
    icon: {
      fontSize: "20px",
      color: "#0070f3",
      cursor: "pointer",
      transition: "0.25s",
    },
    footerIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6px 8px",     // clickable space
      margin: "0 8px",        // fallback spacing if gap doesn't apply
      borderRadius: "8px",
      background: "rgba(0,0,0,0.04)",
      color: "#111",
      textDecoration: "none",
      fontSize: "16px",
    },



  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>🪲 BugFinder</h1>
          <p style={styles.heroText}>
            Instantly debug JavaScript code with stack traces, syntax & runtime error explanations, and more.
          </p>
          <div style={{ 
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "flex-start",   // ⬅ LEFT ALIGN
  alignItems: "center",
  marginTop: "20px"  
}}>
  <button
    style={styles.heroButton}
    onClick={onStart}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#FF4757")}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF6B6B")}
  >
    Find Errors
  </button>

  <button
    style={styles.heroButton}
    onClick={onTips}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#357ABD")}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4A90E2")}
  >
    Coding Tips
  </button>
</div>



        </div>
        <div style={styles.heroImage}>
          <img src={codeImg} alt="Code Illustration" style={{ width: "100%", borderRadius: "20px" }} />
        </div>
      </div>

      {/* Info Section */}
      <div style={styles.infoSection}>
        <h2 style={styles.infoTitle}>About BugFinder</h2>
        <p style={styles.infoText}>
          BugFinder is your modern JavaScript debugging companion. Paste code, find errors, see stack traces, and get precise explanations.
        </p>
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>✅ Syntax Errors</h3>
            <p style={styles.featureText}>Catch missing brackets, commas, and invalid code structure immediately.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>⚠️ Runtime Errors</h3>
            <p style={styles.featureText}>Detect undefined variables, type issues, and runtime exceptions.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>🎯 Stack Traces</h3>
            <p style={styles.featureText}>Pinpoint the exact line and column for faster debugging.</p>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>© 2025 BugFinder — Created By MM</p>

        <div>
          <a href="mailto:madhurimali2004@email.com" style={styles.footerIcon}>📧Gmail</a>
          <a href="https://github.com/malim22" style={styles.footerIcon}>🐱GitHub</a>
        </div>
      </div>



    </div>
  );
}
