import React from 'react';
import './App.css';

import StoryCreation from './components/StoryCreation';
import CharacterIdeas from './components/CharacterIdeas';
import ComicPlotDesign from './components/ComicPlotDesign';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-flex">
          <div className="logo">
            <span className="logo-symbol">🌟</span> StorySpark
          </div>
          <div className="nav-links">
            <a href="#story" className="nav-link">Story</a>
            <a href="#characters" className="nav-link">Characters</a>
            <a href="#comic-plot" className="nav-link">Comic Plot</a>
          </div>
        </div>
      </nav>

      {/* Main content sections */}
      <main className="main-content">
        <section id="story" className="feature-panel">
          <h2 className="feature-title">Story Creator</h2>
          <div className="feature-desc" style={{ marginBottom: 14 }}>
            Dream up a tale and let AI spin a story from your imagination.
          </div>
          <StoryCreation />
        </section>
        <section id="characters" className="feature-panel">
          <h2 className="feature-title">Character Ideas</h2>
          <div className="feature-desc" style={{ marginBottom: 14 }}>
            Generate a unique cast of characters, heroes, and companions.
          </div>
          <CharacterIdeas />
        </section>
        <section id="comic-plot" className="feature-panel">
          <h2 className="feature-title">Comic Plot Designer</h2>
          <div className="feature-desc" style={{ marginBottom: 14 }}>
            Craft amazing comic plots with story panel suggestions.
          </div>
          <ComicPlotDesign />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          © {new Date().getFullYear()} StorySpark &mdash; Ignite Your Imagination.
        </div>
      </footer>
    </div>
  );
}

export default App;