import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../users/styles/navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showCinemaDropdown, setShowCinemaDropdown] = useState(false);

  const navigateToCinema = (id: string) => {
    navigate(`/showtimes/${id}`);
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo">
          <img src="../assets/icons/logo.png" alt="Logo" className="logo-img" />
        </a>
      </div>

      <nav className="main-nav">
        <a href="/movies" className="nav-link">
          MOVIES
        </a>
        <a href="/cinemas" className="nav-link">
          CINEMAS
        </a>
        <a href="/about" className="nav-link">
          ABOUT US
        </a>
        <a href="/login" className="sign-in-button">
          👤 SIGN IN
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
