import React, { useState } from "react";
import { generateStory } from "../api/storyApi";

/**
 * StoryCreation - Feature component for generating and displaying stories.
 * Fetches summary from Wikipedia and provides a creative rewrite.
 */
// PUBLIC_INTERFACE
function StoryCreation() {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [creativeStory, setCreativeStory] = useState("");
  const [wikiTitle, setWikiTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handles async API-based story generation logic.
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSummary("");
    setCreativeStory("");
    setWikiTitle("");
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a story.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generateStory(prompt);
      setSummary(apiRes.summary);
      setCreativeStory(apiRes.creativeStory);
      setWikiTitle(apiRes.title);
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
        placeholder="Type your story idea or a real-world topic (e.g. Cats, Moon Landing)..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button className="btn" onClick={handleGenerate} disabled={loading} style={{ marginBottom: 10 }}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="result-area">
        {error && <span className="error-text">⚠️ {error}</span>}
        {loading && <span style={{ color: "var(--primary)" }}>Generating your story...</span>}
        {!loading && !error && summary && (
          <div style={{ marginBottom: 12 }}>
            <strong>
              📚 Wikipedia Summary{wikiTitle ? `: ${wikiTitle}` : ""}
            </strong>
            <div style={{ color: "var(--text-secondary)", margin: "7px 0 13px 0" }}>
              {summary}
            </div>
          </div>
        )}
        {!loading && !error && creativeStory && (
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 7 }}>
            <strong>🔮 Creative Story Version</strong>
            <div style={{ margin: "7px 0 2px 0" }}>{creativeStory}</div>
          </div>
        )}
        {!loading && !error && !summary && !creativeStory && (
          <span style={{ color: "var(--text-secondary)" }}>
            The generated story will appear here.
          </span>
        )}
      </div>
    </div>
  );
}

export default StoryCreation;
