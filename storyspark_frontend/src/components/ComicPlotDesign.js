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
      <label htmlFor="plot-prompt" className="label">
        Comic Plot Theme
      </label>
      <textarea
        id="plot-prompt"
        className="input-textarea"
        placeholder="Describe a comic theme, genre, or a plot idea..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button className="btn" onClick={handleGenerate} disabled={loading} style={{ marginBottom: 10 }}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="result-area">
        {error && <span className="error-text">⚠️ {error}</span>}
        {!loading && !error && result && <span>{result}</span>}
        {!loading && !error && !result && (
          <span style={{ color: "var(--text-secondary)" }}>
            Your comic plot will appear here.
          </span>
        )}
        {loading && <span style={{ color: "var(--primary)" }}>Generating comic plot...</span>}
      </div>
    </div>
  );
}

export default ComicPlotDesign;
