import React, { useState } from "react";
import { generateCharacters } from "../api/characterApi";

/**
 * CharacterIdeas - Feature component for generating character ideas.
 * Includes prompt, output area, generate button, and state for loading/errors/results.
 */
// PUBLIC_INTERFACE
function CharacterIdeas() {
  const [prompt, setPrompt] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setCharacters([]);
    if (!prompt.trim()) {
      setError("Please enter a description or theme for characters.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generateCharacters(prompt);
      if (Array.isArray(apiRes.characters)) {
        setCharacters(apiRes.characters);
      } else {
        setError("Failed to parse character results.");
      }
    } catch (err) {
      setError(err.message || "Failed to generate character ideas.");
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="char-prompt" className="label">
        Character Prompt
      </label>
      <textarea
        id="char-prompt"
        className="input-textarea"
        placeholder="Describe a character or setting (e.g., superhero, young detective)..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button className="btn" onClick={handleGenerate} disabled={loading} style={{ marginBottom: 10 }}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="result-area">
        {error && <span className="error-text">⚠️ {error}</span>}
        {loading && (
          <span style={{ color: "var(--primary)" }}>Generating character ideas...</span>
        )}

        {!loading && !error && characters.length > 0 && (
          <div>
            <div style={{ fontWeight: "600", marginBottom: 7 }}>
              {`🎭 Generated Characters (${characters.length})`}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {characters.map((char, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: idx % 2 === 0 ? "transparent" : "var(--surface-highlight)",
                    borderRadius: "8px",
                    marginBottom: "9px",
                    padding: "9px 7px"
                  }}
                >
                  <img
                    src={char.avatarUrl}
                    alt={`Avatar of ${char.name}`}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: 8,
                      background: "#fafcff",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 1px 8px #e5eefd35"
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1.04em" }}>{char.name}</div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.97em" }}>
                      {char.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!loading && !error && characters.length === 0 && (
          <span style={{ color: "var(--text-secondary)" }}>
            Your character ideas will appear here.
          </span>
        )}
      </div>
    </div>
  );
}

export default CharacterIdeas;
