"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth_pages.css"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { register } from "../../services/authService"

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [animateForm, setAnimateForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateForm(true)
    }, 100)
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!username || !password || !confirmPassword || !email) {
      setError("All fields are required")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await register(username, password, email)

      if (result.success && result.data) {
        setSuccessMessage("Registration successful! Redirecting to email verification...")
        setError("")
        setTimeout(() => navigate(`/verify-email?userId=${result.data.userId}`), 1500)
      } else {
        setError(result.message || "Registration failed")
        setSuccessMessage("")
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page-container">
      <Navbar />

      <div className="auth-content">
        <div className={`auth-form-container ${animateForm ? "animate" : ""}`}>
          <div className="auth-form-wrapper">
            <div className="form-header">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join us to start booking your favorite movies</p>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {successMessage && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <InputField label="Username" type="text" value={username} onChange={setUsername} />
              </div>

              <div className="form-group">
                <InputField label="Email" type="email" value={email} onChange={setEmail} />
              </div>

              <div className="form-group">
                <InputField label="Password" type="password" value={password} onChange={setPassword} />
              </div>

              <div className="form-group">
                <InputField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>

              <div className="terms-checkbox">
                <input type="checkbox" id="terms" className="custom-checkbox" />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <Link to="/terms" className="terms-link">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="terms-link">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Registering...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-alt-prompt">
              Already have an account?{" "}
              <Link to="/login" className="auth-alt-link">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className={`auth-image-container ${animateForm ? "animate" : ""}`}>
          <div className="auth-image" style={{ backgroundImage: "url('https://imgur.com/caVTbAu.jpg')" }}>
            <div className="image-overlay">
              <div className="promo-content">
                <h2>Join Our Movie Community</h2>
                <p>Get exclusive access to premieres and special events</p>
                <div className="promo-features">
                  <div className="promo-feature">
                    <span className="feature-icon">🎬</span>
                    <span>Early access to blockbuster releases</span>
                  </div>
                  <div className="promo-feature">
                    <span className="feature-icon">💰</span>
                    <span>Member-only discounts and offers</span>
                  </div>
                  <div className="promo-feature">
                    <span className="feature-icon">🏆</span>
                    <span>Earn rewards with every booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default RegisterPage
