"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { verifyResetCode, sendResetCode } from "../../services/authService"
import "../styles/auth_pages.css"

const VerifyResetCodePage = () => {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [animateForm, setAnimateForm] = useState(false)
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

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

        if (!email || !code) {
            setError("Missing email or code.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const res = await verifyResetCode(email, code)
            if (res.success) {
                navigate(`/reset-password?email=${encodeURIComponent(email)}`)
            } else {
                setError(res.message || "Invalid code.")
            }
        } catch (err) {
            setError("Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendCode = async () => {
        if (!email) {
            setError("Email address is missing.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const result = await sendResetCode(email)
            if (result.success) {
                setTimeLeft(300) // Reset timer
            } else {
                setError(result.message || "Failed to resend code.")
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
                            <h1 className="auth-title">Verify Your Code</h1>
                            <p className="auth-subtitle">Enter the 6-digit code sent to your email</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                {error}
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
                                    "Verify Code"
                                )}
                            </button>

                            <button
                                type="button"
                                className="resend-button"
                                onClick={handleResendCode}
                                disabled={timeLeft > 240} // Allow resend after 1 minute
                            >
                                {timeLeft > 240 ? `Resend code in ${formatTime(timeLeft - 240)}` : "Resend code"}
                            </button>
                        </form>

                        <div className="auth-alt-prompt">
                            <Link to="/forgot-password" className="auth-alt-link">
                                ← Back to forgot password
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`auth-image-container ${animateForm ? "animate" : ""}`}>
                    <div className="auth-image" style={{ backgroundImage: "url('https://imgur.com/WAekdBQ.jpg')" }}>
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Almost There!</h2>
                                <p>Enter the verification code to continue resetting your password</p>
                                <div className="verification-info">
                                    <div className="info-item">
                                        <div className="info-icon">📧</div>
                                        <div className="info-text">We've sent a 6-digit code to your email address</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-icon">⏱️</div>
                                        <div className="info-text">The code is valid for 5 minutes</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-icon">📁</div>
                                        <div className="info-text">Check your spam folder if you don't see the email</div>
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

export default VerifyResetCodePage
