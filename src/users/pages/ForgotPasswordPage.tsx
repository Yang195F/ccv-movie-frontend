"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { sendResetCode } from "../../services/authService"
import "../styles/auth_pages.css"

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [animateForm, setAnimateForm] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => {
            setAnimateForm(true)
        }, 100)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setError("Please enter your email address")
            return
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address")
            return
        }

        setMessage("")
        setError("")
        setIsLoading(true)

        try {
            const result = await sendResetCode(email)

            if (result.success) {
                setMessage("Reset code sent to your email.")
                setTimeout(() => {
                    navigate(`/verify-reset?email=${encodeURIComponent(email)}`)
                }, 1500)
            } else {
                setError(result.message || "Something went wrong.")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
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
                            <h1 className="auth-title">Forgot Your Password?</h1>
                            <p className="auth-subtitle">Enter your email to receive a verification code</p>
                        </div>

                        {message && (
                            <div className="success-message">
                                <span className="success-icon">✅</span>
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <InputField label="Email" value={email} onChange={setEmail} type="email" />
                            </div>

                            <button type="submit" className="auth-button" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    "Send Reset Code"
                                )}
                            </button>
                        </form>

                        <div className="auth-alt-prompt">
                            Remember your password?{" "}
                            <Link to="/login" className="auth-alt-link">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`auth-image-container ${animateForm ? "animate" : ""}`}>
                    <div className="auth-image" style={{ backgroundImage: "url('https://imgur.com/WAekdBQ.jpg')" }}>
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Password Recovery</h2>
                                <p>We'll help you get back into your account</p>
                                <div className="recovery-steps">
                                    <div className="recovery-step">
                                        <div className="step-icon">📧</div>
                                        <div className="step-text">
                                            <h3>Enter Your Email</h3>
                                            <p>Provide the email address associated with your account</p>
                                        </div>
                                    </div>
                                    <div className="recovery-step">
                                        <div className="step-icon">🔑</div>
                                        <div className="step-text">
                                            <h3>Verify Your Identity</h3>
                                            <p>Enter the verification code sent to your email</p>
                                        </div>
                                    </div>
                                    <div className="recovery-step">
                                        <div className="step-icon">🔒</div>
                                        <div className="step-text">
                                            <h3>Create New Password</h3>
                                            <p>Set a new secure password for your account</p>
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

export default ForgotPasswordPage
