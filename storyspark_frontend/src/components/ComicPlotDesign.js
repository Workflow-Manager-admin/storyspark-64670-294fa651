import React, { useState } from "react";
import { generatePlot } from "../api/plotApi";

/**
 * ComicPlotDesign - Feature component for designing comic plots with external APIs.
 * Allows user to select the plot idea API or "Rotate (Auto)" for alternating.
 * Shows result using chosen source (BoredAPI or JokeAPI).
 */
// PUBLIC_INTERFACE
function ComicPlotDesign() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("auto"); // "auto", "boredapi", or "jokeapi"
  const [autoIndex, setAutoIndex] = useState(0); // For rotation

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setResult(""); // clear on source change
    setError("");
    setAutoIndex(0);
  };

  // Optionally rotate API for "auto" mode; else use selected
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
      let opts = { source, autoSourceIndex: autoIndex };
      const apiRes = await generatePlot(prompt, opts);
      setResult(apiRes.result);
      // If "auto" rotate next index, else keep at 0
      if (source === "auto") {
        setAutoIndex((prev) => prev + 1);
      }
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
      
      <div style={{ margin: "10px 0" }}>
        <label className="label" htmlFor="plot-source" style={{ marginRight: 13 }}>
          Plot Idea Source:
        </label>
        <select
          id="plot-source"
          className="input"
          value={source}
          onChange={handleSourceChange}
          disabled={loading}
          style={{ minWidth: 118, fontSize: "0.95em", padding: "5px 10px" }}
        >
          <option value="auto">🔄 Rotate (Auto)</option>
          <option value="boredapi">🎲 BoredAPI</option>
          <option value="jokeapi">😂 JokeAPI</option>
        </select>
      </div>

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
