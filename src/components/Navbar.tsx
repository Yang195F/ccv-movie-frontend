"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../users/styles/navbar.css"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const [showCinemaDropdown, setShowCinemaDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateToCinema = (id: string) => {
    navigate(`/showtimes/${id}`)
  }

  return (
    <div className={`navbar-background ${scrolled ? "scrolled" : ""}`}>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1 className="logo-text">MovieClub</h1>
          </Link>
        </div>

        <nav className="main-nav">
          <div className="nav-item">
            <Link to="/movies" className="nav-link">
              MOVIES
            </Link>
            <div className="dropdown-menu">
              <Link to="/movies?category=NOW_SHOWING" className="dropdown-item">
                Now Showing
              </Link>
              <Link to="/movies?category=COMING_SOON" className="dropdown-item">
                Coming Soon
              </Link>
              <Link to="/movies?category=BOOK_EARLY" className="dropdown-item">
                Book Early
              </Link>
            </div>
          </div>

          <div className="nav-item">
            <Link to="/cinemas" className="nav-link">
              CINEMAS
            </Link>
            <div className="dropdown-menu">
              <Link to="/showtimes/pavilion" className="dropdown-item">
                Pavilion KL
              </Link>
              <Link to="/showtimes/boulevard_pvl" className="dropdown-item">
                Boulevard Bintulu
              </Link>
              <Link to="/showtimes/1utama" className="dropdown-item">
                1 Utama
              </Link>
            </div>
          </div>

          <Link to="/about" className="nav-link">
            ABOUT US
          </Link>

          <Link to="/login" className="sign-in-button">
            <span className="sign-in-icon">👤</span>
            <span className="sign-in-text">SIGN IN</span>
          </Link>
        </nav>

        <button className="mobile-menu-button">
          <span className="menu-icon">☰</span>
        </button>
      </header>
    </div>
  )
}

export default Navbar
