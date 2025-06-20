import React, { useState } from "react";
import { generateStory } from "../api/storyApi";

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

  // Handles async API-based story generation logic.
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a story.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generateStory(prompt);
      setResult(apiRes.result);
    } catch (err) {
      setError(err.message || "Failed to generate story.");
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="story-prompt" className="label">
        Your Story Prompt
      </label>
      <textarea
        id="story-prompt"
        className="input-textarea"
        style={{ minHeight: 80 }}
        placeholder="Type your story idea or a seed phrase here..."
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
            The generated story will appear here.
          </span>
        )}
        {loading && <span style={{ color: "var(--primary)" }}>Generating your story...</span>}
      </div>
    </div>
  );
}

export default StoryCreation;
