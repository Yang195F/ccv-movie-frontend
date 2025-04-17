"use client"

import type React from "react"
import { useState } from "react"
import "../styles/pages_styles.css"
import "../styles/login_page.css"
import { useNavigate } from "react-router-dom"
import InputField from "../../components/InputField"
import { register } from "../../services/authService"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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
    <div className="login-page-container">
      <Navbar />

      <div className="login-content">
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1 className="login-title">Create Account</h1>
            <p className="login-subtitle">Join us to start booking your favorite movies</p>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleRegister} className="login-form">
              <InputField label="Username" type="text" value={username} onChange={setUsername} />
              <InputField label="Email" type="email" value={email} onChange={setEmail} />
              <InputField label="Password" type="password" value={password} onChange={setPassword} />
              <InputField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="register-prompt">
              Already have an account?{" "}
              <a href="/login" className="register-link">
                Sign in
              </a>
            </div>
          </div>
        </div>

        <div className="login-image-container">
          <div className="login-image" style={{ backgroundImage: "url('https://imgur.com/caVTbAu.jpg')" }}>
            <div className="image-overlay">
              <div className="promo-content">
                <h2>Join Our Movie Community</h2>
                <p>Get exclusive access to premieres and special events</p>
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