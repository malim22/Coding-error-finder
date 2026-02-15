import React, { useState } from "react";
import * as acorn from "acorn";
import "./index.css";

export default function BugFinder({ goToHome }) {
  const [code, setCode] = useState(`function test(){\n  console.log(x);\n}`);
  const [result, setResult] = useState(null);

  const errorExplanations = {
    SyntaxError: "❌ Invalid syntax — missing bracket, comma, or similar issue.",
    ReferenceError: "⚠️ Variable or function not declared before use.",
    TypeError: "⚠️ Operation on wrong type (e.g., calling a non-function).",
    RangeError: "⚠️ Value outside valid range (like invalid array length).",
    URIError: "⚠️ Invalid or malformed URI sequence.",
    EvalError: "⚠️ Error using eval() function.",
    AggregateError: "⚠️ Multiple errors occurred together.",
    SyntaxErrorUnexpectedToken:
      "❌ Unexpected token — missing comma or bracket.",
    SyntaxErrorUnexpectedEndOfInput:
      "❌ Code ended too early — missing closing bracket/quote.",
    SyntaxErrorMissingParenthesis: "❌ Missing parenthesis in expression.",
    SyntaxErrorMissingBracket: "❌ Missing curly or square bracket.",
    ReferenceErrorNotDefined: "⚠️ You used a variable before declaring it.",
    ReferenceErrorNotInitialized:
      "⚠️ Accessed variable inside Temporal Dead Zone.",
    TypeErrorNotAFunction: "⚠️ You called something that is not a function.",
    TypeErrorUndefined: "⚠️ Cannot read property of undefined.",
    TypeErrorNull: "⚠️ Cannot read property of null.",
    RangeErrorStackOverflow: "⚠️ Too much recursion — infinite loop.",
    RangeErrorInvalidLength: "⚠️ Invalid array length.",
    DOMException: "⚠️ Browser API or DOM access error.",
    JSONError: "⚠️ Error while parsing invalid JSON.",
    PromiseRejection: "⚠️ Unhandled promise rejection.",
    ModuleError: "⚠️ Import/export module issue.",
    RuntimeError: "⚠️ A runtime error occurred during execution.",
    Default: "⚠️ Unknown error — please review your code.",
  };

  const detectExtraErrors = (code) => {
    if (/JSON\.parse/.test(code)) return "⚠️ JSON parsing error — check your JSON format.";
    if (/await/.test(code) && !/async/.test(code)) return "❌ 'await' used inside a non-async function.";
    if (/localStorage|getItem|setItem/.test(code)) return "⚠️ localStorage may throw errors (blocked/full).";
    if (/document\.getElementById/.test(code) && !/<.*id=/.test(code)) return "⚠️ DOM element you are trying to access may not exist.";
    return null;
  };

  const checkCode = async () => {
    setResult({ name: "Checking...", message: "Analyzing your code..." });

    try {
      acorn.parse(code, { ecmaVersion: 2024 });
    } catch (err) {
      setResult({
        name: "SyntaxError",
        message: err.message,
        line: err.loc?.line || "?",
        column: err.loc?.column || "?",
        stack: err.stack || "No stack trace available",
        explanation: errorExplanations.SyntaxError,
      });
      return;
    }

    const extra = detectExtraErrors(code);
    if (extra) {
      setResult({ name: "Possible Issue", message: extra, explanation: extra });
      return;
    }

    runInSandbox(code);
  };

  const runInSandbox = (code) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    try {
      const iframeWindow = iframe.contentWindow;

      iframeWindow.onerror = function (message, source, lineno, colno, error) {
        setResult({
          name: error?.name || "RuntimeError",
          message: message,
          line: lineno,
          column: colno,
          stack: error?.stack || "No stack",
          explanation: errorExplanations[error?.name] || errorExplanations.Default,
        });
        document.body.removeChild(iframe);
        return true;
      };

      iframeWindow.eval?.(code);

      setResult({
        name: "No Error 🎉",
        message: "Your code ran successfully with no syntax/runtime issues!",
        explanation: "Everything looks good!",
        stack: "No stack trace",
      });
    } catch (err) {
      setResult({
        name: err.name,
        message: err.message,
        stack: err.stack || "No stack",
        explanation: errorExplanations[err.name] || errorExplanations.Default,
      });
    } finally {
      document.body.removeChild(iframe);
    }
  };

  return (
    <div style={styles.page}>
      <button
        onClick={goToHome}
        style={styles.backButton}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FF4757")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF6B6B")}
      >
        ← Back
      </button>

      <div style={styles.container}>
        <h2 style={styles.title}>🪲 BugFinder- Code Error Analyzer </h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.textarea}
          rows={12}
        />

        <button onClick={checkCode} style={styles.button}>
          Check Code
        </button>

        {result && (
          <div style={{ ...styles.output, ...styles.slideIn }}>
            <h3>🔍 Result:</h3>
            <p><strong>Error Type:</strong> {result.name}</p>
            {result.line && <p>📍 Line: {result.line}, Column: {result.column}</p>}
            <p><strong>Message:</strong> {result.message}</p>
            <p><strong>Explanation:</strong> {result.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0d0909ff, #0d0b0bff)", margin: 0, padding: 0, boxSizing: "border-box", position: "relative" },
  backButton: { position: "absolute", top: "20px", left: "20px", padding: "10px 25px", borderRadius: "10px", border: "none", backgroundColor: "#FF6B6B", color: "#fff", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", zIndex: 10 },
  container: { maxWidth: "750px", padding: "30px 25px", borderRadius: "16px", background: "#e4ddddff", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxHeight: "90vh", overflowY: "auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: "all 0.4s ease-in-out" },
  title: { textAlign: "center", marginBottom: "20px", color: "#222", fontSize: "26px", letterSpacing: "0.5px" },
  textarea: { width: "100%", maxWidth: "700px", fontFamily: "monospace", fontSize: "15px", borderRadius: "10px", padding: "14px", border: "1px solid #ccc", resize: "vertical", outline: "none", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08)", transition: "all 0.3s ease" },
  button: { marginTop: "15px", padding: "12px 30px", border: "none", backgroundColor: "#4A90E2", color: "white", fontWeight: "600", borderRadius: "10px", cursor: "pointer", transition: "all 0.3s ease" },
  output: { marginTop: "25px", width: "100%", maxWidth: "700px", background: "#000000", color: "#ffffff", borderRadius: "12px", padding: "22px", border: "1px solid #ddd", boxShadow: "0 8px 25px rgba(0,0,0,0.5)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "10px", maxHeight: "250px", overflowY: "auto" },
  slideIn: { opacity: 1, transform: "translateY(0)" },
};
