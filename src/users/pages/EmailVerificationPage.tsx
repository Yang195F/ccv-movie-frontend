import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "../styles/pages_styles.css"
import "../styles/login_page.css"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { verifyEmail } from "../../services/authService"

const EmailVerificationPage: React.FC = () => {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const userId = new URLSearchParams(location.search).get("userId")

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

    return (
        <div className="login-page-container">
            <Navbar />

            <div className="login-content">
                <div className="login-form-container">
                    <div className="login-form-wrapper">
                        <h1 className="login-title">Verify Your Email</h1>
                        <p className="login-subtitle">Enter the code sent to your email address</p>

                        {error && <div className="error-message">{error}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}

                        <form onSubmit={handleVerify} className="login-form">
                            <InputField
                                label="Verification Code"
                                type="text"
                                value={code}
                                onChange={setCode}
                            />

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? "Verifying..." : "Verify"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="login-image-container">
                    <div
                        className="login-image"
                        style={{ backgroundImage: "url('https://imgur.com/caVTbAu.jpg')" }}
                    >
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Thank you for registering!</h2>
                                <p>Complete verification to start using your account.</p>
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
