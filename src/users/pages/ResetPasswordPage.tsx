"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { resetPassword } from "../../services/authService"
import "../styles/auth_pages.css"

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [animateForm, setAnimateForm] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get("email")

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => {
            setAnimateForm(true)
        }, 100)
    }, [])

    useEffect(() => {
        // Calculate password strength
        if (!password) {
            setPasswordStrength(0)
            return
        }

        let strength = 0

        // Length check
        if (password.length >= 8) strength += 1

        // Contains number
        if (/\d/.test(password)) strength += 1

        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 1

        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 1

        // Contains special char
        if (/[^A-Za-z0-9]/.test(password)) strength += 1

        setPasswordStrength(strength)
    }, [password])

    const getStrengthLabel = () => {
        if (passwordStrength === 0) return "Very Weak"
        if (passwordStrength === 1) return "Weak"
        if (passwordStrength === 2) return "Fair"
        if (passwordStrength === 3) return "Good"
        if (passwordStrength === 4) return "Strong"
        return "Very Strong"
    }

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return "#e53e3e"
        if (passwordStrength === 2) return "#dd6b20"
        if (passwordStrength === 3) return "#d69e2e"
        if (passwordStrength === 4) return "#38a169"
        return "#2b6cb0"
    }

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setError("Email address is missing.")
            return
        }

        if (!password || !confirmPassword) {
            setError("Please enter and confirm your new password.")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords must match.")
            return
        }

        if (passwordStrength < 3) {
            setError("Please choose a stronger password.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const res = await resetPassword(email, password)
            if (res.success) {
                setSuccessMessage("Password reset successful! Redirecting to login...")
                setTimeout(() => navigate("/login"), 2000)
            } else {
                setError(res.message || "Reset failed.")
            }
        } catch (err) {
            setError("Something went wrong.")
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
                            <h1 className="auth-title">Reset Your Password</h1>
                            <p className="auth-subtitle">Create a new secure password for your account</p>
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

                        <form onSubmit={handleReset} className="auth-form">
                            <div className="form-group">
                                <InputField label="New Password" type="password" value={password} onChange={setPassword} />
                                {password && (
                                    <div className="password-strength">
                                        <div className="strength-meter">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`strength-segment ${index < passwordStrength ? "active" : ""}`}
                                                    style={{ backgroundColor: index < passwordStrength ? getStrengthColor() : undefined }}
                                                ></div>
                                            ))}
                                        </div>
                                        <div className="strength-label" style={{ color: getStrengthColor() }}>
                                            {getStrengthLabel()}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                />
                                {password && confirmPassword && (
                                    <div className={`password-match ${password === confirmPassword ? "match" : "no-match"}`}>
                                        {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="auth-button" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Resetting...</span>
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>

                        <div className="auth-alt-prompt">
                            <Link to="/login" className="auth-alt-link">
                                ← Back to login
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`auth-image-container ${animateForm ? "animate" : ""}`}>
                    <div className="auth-image" style={{ backgroundImage: "url('https://imgur.com/WAekdBQ.jpg')" }}>
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Create a Strong Password</h2>
                                <p>Protect your account with a secure password</p>
                                <div className="password-tips">
                                    <div className="password-tip">
                                        <div className="tip-icon">🔒</div>
                                        <div className="tip-text">
                                            <h3>Use at least 8 characters</h3>
                                            <p>Longer passwords are harder to crack</p>
                                        </div>
                                    </div>
                                    <div className="password-tip">
                                        <div className="tip-icon">🔣</div>
                                        <div className="tip-text">
                                            <h3>Mix characters</h3>
                                            <p>Include uppercase, lowercase, numbers, and symbols</p>
                                        </div>
                                    </div>
                                    <div className="password-tip">
                                        <div className="tip-icon">⚠️</div>
                                        <div className="tip-text">
                                            <h3>Avoid common words</h3>
                                            <p>Don't use easily guessable information</p>
                                        </div>
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

export default ResetPasswordPage
