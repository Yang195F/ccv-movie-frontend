import React from "react";
import { useNavigate } from "react-router-dom";
import "../admins/styles/navbar.css";

const NavbarAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header admin-header">
      <div className="header-left">
        <a href="/dashboardAdmin" className="logo">
          <img src="/assets/logo.png" alt="Admin Logo" className="logo-img" />
        </a>
      </div>

      <nav className="main-nav">
        <a className="nav-link" onClick={() => navigate("/addmovie")}>
          ➕ Add Movie
        </a>
        <a className="nav-link" onClick={() => navigate("/manageshow")}>
          🎭 Manage Show
        </a>
        <a className="nav-link" onClick={() => navigate("/managebooking")}>
          🎫 Manage Booking
        </a>
        <a className="nav-link" onClick={() => navigate("/monthlyreport")}>
          📊 Monthly Report
        </a>
        <a className="sign-in-button" onClick={() => navigate("/logout")}>
          🔓 Logout
        </a>
      </nav>
    </header>
  );
};

export default NavbarAdmin;
