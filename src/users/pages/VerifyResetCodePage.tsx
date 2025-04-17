import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { verifyResetCode } from "../../services/authService"
import "../styles/login_page.css"

const VerifyResetCodePage = () => {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get("email")

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
                        <h1 className="login-title">Verify Your Code</h1>
                        <p className="login-subtitle">Enter the 6-digit code sent to your email</p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleVerify} className="login-form">
                            <InputField label="Verification Code" type="text" value={code} onChange={setCode} />

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? "Verifying..." : "Verify Code"}
                            </button>
                        </form>

                        <div className="register-prompt">
                            Didn't get the code?{" "}
                            <a href={`/forgot-password`} className="register-link">
                                Try again
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

export default VerifyResetCodePage
