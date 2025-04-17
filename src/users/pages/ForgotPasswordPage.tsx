import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { sendResetCode } from "../../services/authService"
import "../styles/login_page.css"

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setError("")
        setIsLoading(true)

        const result = await sendResetCode(email)

        if (result.success) {
            setMessage("Code sent to your email.")
            navigate(`/verify-reset?email=${encodeURIComponent(email)}`)
        } else {
            setError(result.message || "Something went wrong.")
        }

        setIsLoading(false)
    }

    return (
        <div className="login-page-container">
            <Navbar />

            <div className="login-content">
                <div className="login-form-container">
                    <div className="login-form-wrapper">
                        <h1 className="login-title">Forgot Your Password?</h1>
                        <p className="login-subtitle">Enter your email to receive a verification code</p>

                        {message && <div className="success-message">{message}</div>}
                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="login-form">
                            <InputField label="Email" value={email} onChange={setEmail} type="email" />

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Reset Code"}
                            </button>
                        </form>

                        <div className="register-prompt">
                            Remember your password?{" "}
                            <a href="/login" className="register-link">
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>

                <div className="login-image-container">
                    <div
                        className="login-image"
                        style={{ backgroundImage: "url('https://imgur.com/WAekdBQ.jpg')" }}
                    >
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Experience Movies Like Never Before</h2>
                                <p>Book tickets, earn rewards, and enjoy exclusive offers</p>
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
