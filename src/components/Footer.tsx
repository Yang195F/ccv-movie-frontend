import React from "react";
import "../users/styles/components_styles.css"; // Make sure you style it too

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <p>MOVIES</p>
          <p>CINEMAS</p>
          <p>FOOD & DRINKS</p>
          <p>EXPERIENCES</p>
        </div>
        <div className="footer-column">
          <p>PROMOTIONS</p>
          <p>ABOUT MOVIECLUB</p>
          <p>ABOUT US</p>
        </div>
        <div className="footer-column">
          <p>NEWS</p>
          <p>SUPPORT</p>
          <p>CONTACT US</p>
        </div>
        <div className="footer-column social">
          <p>Connect with us</p>
          <div className="social-icons">
            <span>📘</span>
            <span>❌</span>
            <span>📸</span>
            <span>▶️</span>
            <span>🎵</span>
          </div>
          <p>Download App</p>
          <div className="app-icons">
            <span>📱</span>
            <span>🍏</span>
            <span>💳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
