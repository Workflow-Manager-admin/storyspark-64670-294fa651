import React, { useState } from "react";
import { generatePlot } from "../api/plotApi";

/**
 * ComicPlotDesign - Feature component for designing comic plots with prompt input and AI result area.
 * Placeholder logic for generate functionality and states for loading/errors/results.
 */
// PUBLIC_INTERFACE
function ComicPlotDesign() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");
    if (!prompt.trim()) {
      setError("Please write a theme or comic plot idea.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generatePlot(prompt);
      setResult(apiRes.result);
    } catch (err) {
      setError(err.message || "Failed to generate comic plot.");
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="plot-prompt" style={{ fontWeight: 500 }}>
        Comic Plot Theme
      </label>
      <textarea
        id="plot-prompt"
        className="input-textarea"
        style={{ width: "100%", minHeight: 60, marginBottom: 10, borderRadius: 7, border: "1px solid var(--border-color)", padding: 10, fontSize: "1.05rem" }}
        placeholder="Describe a comic theme, genre, or a plot idea..."
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
        {!loading && !error && !result && <span style={{ color: "var(--text-secondary)" }}>Your comic plot will appear here.</span>}
        {loading && <span style={{ color: "var(--primary)" }}>Generating comic plot...</span>}
      </div>
    </div>
  );
}

export default ComicPlotDesign;
