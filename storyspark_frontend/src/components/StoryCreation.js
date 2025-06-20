import React, { useState } from "react";

/**
 * StoryCreation - Feature component for generating and displaying AI-generated stories.
 * Includes prompt input, result area, generation button, and placeholder loading/error/result state.
 */
// PUBLIC_INTERFACE
function StoryCreation() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Placeholder "Generate" logic; to be connected with the real API later.
  const handleGenerate = () => {
    setLoading(true);
    setError("");
    setResult("");
    // Emulate async API with a timeout
    setTimeout(() => {
      if (!prompt.trim()) {
        setError("Please enter a prompt to generate a story.");
        setLoading(false);
        return;
      }
      setResult(`✨ (Generated Story for prompt: "${prompt}")\n\nOnce upon a time... [This is a placeholder result.]`);
      setLoading(false);
    }, 1100);
  };

  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="story-prompt" style={{ fontWeight: 500 }}>
        Your Story Prompt
      </label>
      <textarea
        id="story-prompt"
        className="input-textarea"
        style={{ width: "100%", minHeight: 80, marginBottom: 10, borderRadius: 7, border: "1px solid var(--border-color)", padding: 10, fontSize: "1.05rem" }}
        placeholder="Type your story idea or a seed phrase here..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button className="btn" style={{ marginBottom: 15 }} onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div style={{ minHeight: 54, width: "100%", background: "#f8fafb", borderRadius: 7, padding: 11, marginTop: 6, border: "1px solid var(--surface-highlight)", color: "#121924" }}>
        {error && <span style={{ color: "#c10000" }}>⚠️ {error}</span>}
        {!loading && !error && result && <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{result}</pre>}
        {!loading && !error && !result && <span style={{ color: "var(--text-secondary)" }}>The generated story will appear here.</span>}
        {loading && <span style={{ color: "var(--primary)" }}>Generating your story...</span>}
      </div>
    </div>
  );
}

export default StoryCreation;
