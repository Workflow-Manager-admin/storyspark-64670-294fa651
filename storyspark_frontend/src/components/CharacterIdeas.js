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
            <div style={{ fontWeight: "600", marginBottom: 9 }}>
              {`🎭 Generated Characters (${characters.length})`}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(215px, 1fr))",
                gap: "18px",
                width: "100%",
                marginTop: 5,
                marginBottom: 4,
              }}
            >
              {characters.map((char, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--surface-highlight)",
                    borderRadius: "13px",
                    border: "1px solid var(--border-color)",
                    padding: "14px 13px 13px 13px",
                    boxShadow: "0 1px 8px #e9f2ff22",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: 164,
                  }}
                >
                  <img
                    src={char.avatarUrl}
                    alt={`Avatar of ${char.name}`}
                    width={64}
                    height={64}
                    loading="lazy"
                    style={{
                      borderRadius: "12px",
                      background: "#fafcff",
                      border: "1.5px solid var(--primary)",
                      boxShadow: "0 1px 12px #bbe3fc33",
                      marginBottom: 9,
                      marginTop: 2,
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.07em",
                      marginBottom: 3,
                      textAlign: "center",
                      color: "var(--primary)",
                      textShadow: "0 1px 0 #fff8,0 2px 8px #e4eeff32"
                    }}
                  >
                    {char.name}
                  </div>
                  {char.description && (
                    <div
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.98em",
                        textAlign: "center",
                        marginTop: 1,
                        lineHeight: 1.4
                      }}
                    >
                      {char.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
