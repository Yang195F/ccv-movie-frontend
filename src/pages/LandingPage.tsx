import React from "react";
import "./page_styles.css";

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">YourCinema</div>
        <ul className="nav-links">
          <li>
            <a href="/now-showing">Now Showing</a>
          </li>
          <li>
            <a href="/cinemas">Cinemas</a>
          </li>
          <li>
            <a href="/promotions">Promotions</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to YourCinema</h1>
          <p>Experience the magic of movies like never before!</p>
          <button onClick={() => (window.location.href = "/movies")}>
            Book Tickets Now
          </button>
        </div>
      </section>

      {/* Movie Highlights */}
      <section className="highlights">
        <h2>Now Showing</h2>
        <div className="movie-grid">
          <div className="movie-card">
            <img src="/movie1.jpg" alt="Movie 1" />
            <p>Movie Title 1</p>
          </div>
          <div className="movie-card">
            <img src="/movie2.jpg" alt="Movie 2" />
            <p>Movie Title 2</p>
          </div>
          <div className="movie-card">
            <img src="/movie3.jpg" alt="Movie 3" />
            <p>Movie Title 3</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 YourCinema. All rights reserved.</p>
        <div className="social-links">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
