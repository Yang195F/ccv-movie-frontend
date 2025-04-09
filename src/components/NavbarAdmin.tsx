import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const NavbarAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header admin-header">
      <div className="header-left">
        <a href="/admin" className="logo">
          <img src="/assets/logo-admin.png" alt="Admin Logo" className="logo-img" />
        </a>
      </div>

      <nav className="main-nav">
        <a className="nav-link" onClick={() => navigate("/admin/add-movie")}>
          ➕ Add Movie
        </a>
        <a className="nav-link" onClick={() => navigate("/admin/manage-show")}>
          🎭 Manage Show
        </a>
        <a className="nav-link" onClick={() => navigate("/admin/manage-booking")}>
          🎫 Manage Booking
        </a>
        <a className="nav-link" onClick={() => navigate("/admin/monthly-report")}>
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
