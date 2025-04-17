import type React from "react"
import "../users/styles/footer.css" // Make sure you style it too

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>MovieClub</h2>
          <p>Experience movies like never before</p>
        </div>
        <div className="footer-newsletter">
          <h3>Subscribe to our newsletter</h3>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Movies</h4>
          <p>Now Showing</p>
          <p>Coming Soon</p>
          <p>Book Early</p>
          <p>Experiences</p>
        </div>
        <div className="footer-column">
          <h4>Cinemas</h4>
          <p>Pavilion KL</p>
          <p>Boulevard Bintulu</p>
          <p>1 Utama</p>
          <p>Find a Cinema</p>
        </div>
        <div className="footer-column">
          <h4>About</h4>
          <p>About MovieClub</p>
          <p>Careers</p>
          <p>News</p>
          <p>Contact Us</p>
        </div>
        <div className="footer-column social">
          <h4>Connect with us</h4>
          <div className="social-icons">
            <span>📘</span>
            <span>❌</span>
            <span>📸</span>
            <span>▶️</span>
            <span>🎵</span>
          </div>
          <h4>Download App</h4>
          <div className="app-icons">
            <span>📱</span>
            <span>🍏</span>
            <span>💳</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieClub. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
          <a href="/help">Help Center</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
