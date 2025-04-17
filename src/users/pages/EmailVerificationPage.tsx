"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import "../styles/auth_pages.css"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { verifyEmail } from "../../services/authService"

const EmailVerificationPage: React.FC = () => {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [animateForm, setAnimateForm] = useState(false)
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

    const navigate = useNavigate()
    const location = useLocation()
    const userId = new URLSearchParams(location.search).get("userId")

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => {
            setAnimateForm(true)
        }, 100)
    }, [])

    useEffect(() => {
        // Countdown timer
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!code) {
            setError("Please enter the verification code")
            return
        }

        if (!userId) {
            setError("User ID not found")
            return
        }

        setIsLoading(true)
        setError("")
        try {
            const result = await verifyEmail(userId, code)

            if (result.success) {
                setSuccessMessage("Email verified successfully! Redirecting to login...")
                setTimeout(() => navigate("/login"), 2000)
            } else {
                setError(result.message || "Verification failed")
            }
        } catch (err) {
            setError("An error occurred during verification")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendCode = () => {
        // Implement resend code functionality here
        setTimeLeft(300) // Reset timer
        setSuccessMessage("A new verification code has been sent to your email")
    }

    return (
        <div className="auth-page-container">
            <Navbar />

            <div className="auth-content">
                <div className={`auth-form-container ${animateForm ? "animate" : ""}`}>
                    <div className="auth-form-wrapper">
                        <div className="form-header">
                            <h1 className="auth-title">Verify Your Email</h1>
                            <p className="auth-subtitle">Enter the code sent to your email address</p>
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

                        <form onSubmit={handleVerify} className="auth-form">
                            <div className="verification-code-container">
                                <InputField label="Verification Code" type="text" value={code} onChange={setCode} />
                                <div className="code-timer">
                                    Code expires in: <span className={timeLeft < 60 ? "expiring" : ""}>{formatTime(timeLeft)}</span>
                                </div>
                            </div>

                            <button type="submit" className="auth-button" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    "Verify Email"
                                )}
                            </button>

                            <button type="button" className="resend-button" onClick={handleResendCode} disabled={timeLeft > 0}>
                                {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : "Resend verification code"}
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
                    <div className="auth-image" style={{ backgroundImage: "url('https://imgur.com/caVTbAu.jpg')" }}>
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Thank you for registering!</h2>
                                <p>Complete verification to start using your account.</p>
                                <div className="verification-steps">
                                    <div className="verification-step">
                                        <div className="step-number">1</div>
                                        <div className="step-text">Check your email inbox</div>
                                    </div>
                                    <div className="verification-step">
                                        <div className="step-number">2</div>
                                        <div className="step-text">Enter the 6-digit code</div>
                                    </div>
                                    <div className="verification-step">
                                        <div className="step-number">3</div>
                                        <div className="step-text">Start enjoying MovieClub!</div>
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

export default EmailVerificationPage
