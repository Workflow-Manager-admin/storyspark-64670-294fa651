import React, { useState } from "react";

/**
 * CharacterIdeas - Feature component for generating character ideas.
 * Includes prompt, output area, generate button, and state for loading/errors/results.
 */
// PUBLIC_INTERFACE
function CharacterIdeas() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = () => {
    setLoading(true);
    setError("");
    setResult("");
    setTimeout(() => {
      if (!prompt.trim()) {
        setError("Please enter a description or theme for characters.");
        setLoading(false);
        return;
      }
      setResult(`🎭 (Generated Characters for: "${prompt}")\n\n1. Alexia the Time-Traveler\n2. Bolt the Cyberfox\n3. Luna, Guardian of Dreams\n... [This is a placeholder result.]`);
      setLoading(false);
    }, 1100);
  };

  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="char-prompt" style={{ fontWeight: 500 }}>
        Character Prompt
      </label>
      <textarea
        id="char-prompt"
        className="input-textarea"
        style={{ width: "100%", minHeight: 60, marginBottom: 10, borderRadius: 7, border: "1px solid var(--border-color)", padding: 10, fontSize: "1.05rem" }}
        placeholder="Describe a character or setting (e.g., superhero, young detective)..."
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
        {!loading && !error && !result && <span style={{ color: "var(--text-secondary)" }}>Your character ideas will appear here.</span>}
        {loading && <span style={{ color: "var(--primary)" }}>Generating character ideas...</span>}
      </div>
    </div>
  );
}

export default CharacterIdeas;
