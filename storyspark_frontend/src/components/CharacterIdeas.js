import React, { useState, useRef, useEffect } from "react";
import { generateCharacters } from "../api/characterApi";

/**
 * CharacterIdeas - Feature component for generating a single character immediately.
 * Only the most recently generated character (avatar + text) is displayed and highlighted.
 */
// PUBLIC_INTERFACE
function CharacterIdeas() {
  const [prompt, setPrompt] = useState("");
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [justGenerated, setJustGenerated] = useState(false);
  const charCardRef = useRef(null);

  // Scroll the result into view if newly generated
  useEffect(() => {
    if (justGenerated && charCardRef.current) {
      charCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setJustGenerated(false), 800); // Remove highlight after a moment
    }
  }, [justGenerated]);

  // Button handler for generating a single character
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setCharacter(null);
    setJustGenerated(false);
    if (!prompt.trim()) {
      setError("Please enter a description or theme for characters.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generateCharacters(prompt);
      if (Array.isArray(apiRes.characters) && apiRes.characters.length > 0) {
        // Display only the first character (remove history)
        setCharacter(apiRes.characters[0]);
        setJustGenerated(true);
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
      <button
        className="btn"
        onClick={handleGenerate}
        disabled={loading}
        style={{ marginBottom: 10 }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="result-area">
        {error && <span className="error-text">⚠️ {error}</span>}
        {loading && (
          <span style={{ color: "var(--primary)" }}>Generating character...</span>
        )}

        {!loading && !error && character && (
          <div
            ref={charCardRef}
            style={{
              background: "var(--surface-highlight)",
              borderRadius: "14px",
              border: justGenerated ? "2.5px solid var(--accent)" : "1px solid var(--border-color)",
              boxShadow: justGenerated
                ? "0 4px 14px #fee7c438, 0 2px 16px #fffef922"
                : "0 1px 8px #e9f2ff22",
              padding: "18px 12px 15px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 162,
              margin: "5px 0 7px 0",
              transition: "border-color 0.24s, box-shadow 0.23s"
            }}
            tabIndex={-1}
            aria-live="polite"
          >
            <img
              src={character.avatarUrl}
              alt={`Avatar of ${character.name}`}
              width={72}
              height={72}
              loading="lazy"
              style={{
                borderRadius: "13px",
                background: "#fafcff",
                border: "2px solid var(--primary)",
                boxShadow: "0 1px 14px #bbe3fc33",
                marginBottom: 11,
                marginTop: 2,
                outline: justGenerated ? "2.5px solid var(--accent)" : "none",
                outlineOffset: "2px"
              }}
            />
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.18em",
                marginBottom: 4,
                textAlign: "center",
                color: "var(--primary)",
                textShadow: "0 1px 0 #fff8,0 2px 8px #e4eeff32"
              }}
            >
              {character.name}
            </div>
            {character.description && (
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.06em",
                  textAlign: "center",
                  marginTop: 2,
                  lineHeight: 1.38
                }}
              >
                {character.description}
              </div>
            )}
          </div>
        )}
        {!loading && !error && !character && (
          <span style={{ color: "var(--text-secondary)" }}>
            Your character idea will appear here.
          </span>
        )}
      </div>
    </div>
  );
}

export default CharacterIdeas;
