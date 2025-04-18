import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import InputField from "../../components/InputField"
import { login } from "../../services/authService"
import "../styles/login_page.css"

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [animateForm, setAnimateForm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => setAnimateForm(true), 100)
    }, [])

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
                sessionStorage.setItem("authToken", result.data.token)
                sessionStorage.setItem("refreshToken", result.data.refreshToken)
                sessionStorage.setItem("user", JSON.stringify(result.data.user))
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
                <div className={`login-form-container ${animateForm ? "animate" : ""}`}>
                    <div className="login-form-wrapper">
                        <div className="form-header">
                            <h1 className="login-title">Welcome Back</h1>
                            <p className="login-subtitle">Sign in to continue your movie experience</p>
                        </div>
                        {error && <div className="error-message">⚠️ {error}</div>}

                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <InputField label="Email" type="text" value={email} onChange={setEmail} />
                            </div>
                            <div className="form-group">
                                <InputField label="Password" type="password" value={password} onChange={setPassword} />
                            </div>
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" className="custom-checkbox" />
                                    Remember me
                                </label>
                                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                            </div>
                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? <><span className="spinner"></span> Signing in...</> : "Sign In"}
                            </button>
                            <div className="social-login">
                                <p className="social-divider"><span>or continue with</span></p>
                                <div className="social-buttons">
                                    <button type="button" className="social-button google">G</button>
                                    <button type="button" className="social-button facebook">f</button>
                                    <button type="button" className="social-button apple" />
                                </div>
                            </div>
                        </form>

                        <div className="register-prompt">
                            Don't have an account? <Link to="/register" className="register-link">Register now</Link>
                        </div>
                    </div>
                </div>

                <div className={`login-image-container ${animateForm ? "animate" : ""}`}>
                    <div className="login-image" style={{ backgroundImage: `url("/assets/icons/login.jpg")` }}>
                        <div className="image-overlay">
                            <div className="promo-content">
                                <h2>Experience Movies Like Never Before</h2>
                                <p>Book tickets, earn rewards, and enjoy exclusive offers</p>
                                <div className="promo-features">
                                    <div className="promo-feature">🎟️ Easy online booking</div>
                                    <div className="promo-feature">🍿 Exclusive concession deals</div>
                                    <div className="promo-feature">🎁 Earn points with every purchase</div>
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

export default LoginPage
