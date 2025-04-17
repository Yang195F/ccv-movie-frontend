import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { resetPassword } from "../../services/authService"
import "../styles/login_page.css"

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get("email")

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password || password !== confirmPassword) {
            setError("Passwords must match and cannot be empty.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const res = await resetPassword(email, password)
            if (res.success) {
                navigate("/login")
            } else {
                setError(res.message || "Reset failed.")
            }
        } catch {
            setError("Something went wrong.")
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
                        <h1 className="login-title">Reset Your Password</h1>
                        <p className="login-subtitle">Enter and confirm your new password</p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleReset} className="login-form">
                            <InputField
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                            />
                            <InputField
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
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

export default ResetPasswordPage
