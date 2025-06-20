import React, { useState } from "react";
import { generateStory } from "../api/storyApi";

/**
 * StoryCreation - Feature component for generating and displaying stories using OpenAI API.
 * Sends user prompt to OpenAI and displays the AI-generated story.
 */
// PUBLIC_INTERFACE
function StoryCreation() {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handles async API-based story generation logic.
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setStory("");
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a story.");
      setLoading(false);
      return;
    }
    if (!apiKey.trim()) {
      setError("Please enter your OpenAI API key.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generateStory(prompt, apiKey.trim());
      setStory(apiRes.story);
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
        placeholder="Type your story idea (e.g. magical cat, space adventure, historical tale)..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <label htmlFor="openai-key" className="label" style={{ marginTop: 6 }}>
        OpenAI API Key
      </label>
      <input
        id="openai-key"
        type="password"
        className="input"
        style={{ marginBottom: 9 }}
        placeholder="sk-... (Paste your OpenAI secret key here)"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        disabled={loading}
        autoComplete="off"
      />
      <button className="btn" onClick={handleGenerate} disabled={loading} style={{ marginBottom: 10 }}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="result-area">
        {error && <span className="error-text">⚠️ {error}</span>}
        {loading && <span style={{ color: "var(--primary)" }}>Generating your story...</span>}
        {!loading && !error && story && (
          <div style={{ marginBottom: 12 }}>
            <strong>📖 Your Generated Story</strong>
            <div style={{ color: "var(--text-secondary)", margin: "7px 0 13px 0", whiteSpace: "pre-line" }}>
              {story}
            </div>
          </div>
        )}
        {!loading && !error && !story && (
          <span style={{ color: "var(--text-secondary)" }}>
            The generated story will appear here.
          </span>
        )}
      </div>
      <div style={{ fontSize: "0.89em", color: "var(--text-secondary)", marginTop: 8 }}>
        Don't have an OpenAI API key?{" "}
        <a
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--primary)", textDecoration: "underline" }}
        >
          Get one here
        </a>
        . Your key remains in your browser only.
      </div>
    </div>
  );
}

export default StoryCreation;
