import React, { useState, useRef, useEffect } from "react";
import { generateCharacters } from "../api/characterApi";

/**
 * CharacterIdeas - Feature component for generating a single character immediately.
 * Only the most recently generated character (avatar + text) is displayed and highlighted.
 * All previous characters/history/list are removed from UI.
 */
// PUBLIC_INTERFACE
function CharacterIdeas() {
  const [prompt, setPrompt] = useState("");
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [justGenerated, setJustGenerated] = useState(false);
  const charCardRef = useRef(null);

  // Move focus and scroll to new result when character is created
  useEffect(() => {
    if (justGenerated && charCardRef.current) {
      charCardRef.current.focus();
      charCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setJustGenerated(false), 800); // Remove highlight after a moment
    }
  }, [justGenerated]);

  // PUBLIC_INTERFACE
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setCharacter(null);
    setJustGenerated(false);
    if (!prompt.trim()) {
      setError("Please enter a description or theme for a character.");
      setLoading(false);
      return;
    }
    try {
      const apiRes = await generateCharacters(prompt);
      if (Array.isArray(apiRes.characters) && apiRes.characters.length > 0) {
        // Only show the first character, removing any previous
        setCharacter(apiRes.characters[0]);
        setJustGenerated(true);
      } else {
        setError("Failed to parse character results.");
      }
    } catch (err) {
      setError(err.message || "Failed to generate character idea.");
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
      <div className="result-area" style={{ minHeight: 170, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {error && <span className="error-text">⚠️ {error}</span>}
        {loading && (
          <span style={{ color: "var(--primary)" }}>Generating character...</span>
        )}

        {/* Only the latest character is shown, never a list/history. */}
        {!loading && !error && character && (
          <div
            ref={charCardRef}
            style={{
              background: "var(--surface-highlight)",
              borderRadius: "16px",
              border: justGenerated
                ? "2.5px solid var(--accent)"
                : "1px solid var(--border-color)",
              boxShadow: justGenerated
                ? "0 4px 18px #fee7c438, 0 2px 17px #fffef922"
                : "0 1px 8px #e9f2ff22",
              padding: "22px 18px 19px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "245px",
              maxWidth: 320,
              minHeight: 135,
              margin: "5px 0 7px 0",
              transition: "border-color 0.28s, box-shadow 0.23s",
              outline: "none"
            }}
            tabIndex={-1}
            aria-live="polite"
          >
            <img
              src={character.avatarUrl}
              alt={`Avatar of ${character.name}`}
              width={85}
              height={85}
              loading="lazy"
              style={{
                borderRadius: "14px",
                background: "#fafcff",
                border: "2px solid var(--primary)",
                boxShadow: "0 1px 14px #bbe3fc33",
                marginBottom: 15,
                marginTop: 1,
                outline: justGenerated ? "2.5px solid var(--accent)" : "none",
                outlineOffset: "2px"
              }}
            />
            <div
              style={{
                fontWeight: 800,
                fontSize: "1.23em",
                marginBottom: 5,
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
                  fontSize: "1.07em",
                  textAlign: "center",
                  marginTop: 2,
                  lineHeight: 1.44
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
