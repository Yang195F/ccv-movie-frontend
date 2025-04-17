import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { login } from "../../services/authService"
import "../styles/login_page.css"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Please enter both Email and Password")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const result = await login(email, password)

            if (result.success && result.data) {
                // Store token in localStorage or sessionStorage
                localStorage.setItem("authToken", result.data.token)
                localStorage.setItem("refreshToken", result.data.refreshToken)
                localStorage.setItem("user", JSON.stringify(result.data.user))

                // Redirect to home page
                navigate("/")
            } else {
                setError(result.message || "Login failed. Please check your credentials.")
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.")
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
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to continue your movie experience</p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleLogin} className="login-form">
                            <InputField label="Email" type="text" value={email} onChange={setEmail} />

                            <InputField label="Password" type="password" value={password} onChange={setPassword} />

                            <div className="form-options">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <a href="/forgot-password" className="forgot-password">
                                    Forgot password?
                                </a>
                            </div>

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <div className="register-prompt">
                            Don't have an account?{" "}
                            <a href="/register" className="register-link">
                                Register now
                            </a>
                        </div>
                    </div>
                </div>

                <div className="login-image-container">
                    <div className="login-image" style={{ backgroundImage: "url('https://imgur.com/WAekdBQ.jpg')" }}>
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

export default LoginPage
