import React from 'react';
import './App.css';

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
          <p className="feature-desc">
            Dream up a tale! (Feature coming soon...)
          </p>
        </section>
        <section id="characters" className="feature-panel">
          <h2 className="feature-title">Character Ideas</h2>
          <p className="feature-desc">
            Generate a unique cast! (Feature coming soon...)
          </p>
        </section>
        <section id="comic-plot" className="feature-panel">
          <h2 className="feature-title">Comic Plot Designer</h2>
          <p className="feature-desc">
            Craft amazing comic plots! (Feature coming soon...)
          </p>
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