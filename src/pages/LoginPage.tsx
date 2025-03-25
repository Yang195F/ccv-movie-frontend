import React, { useState } from "react";
import "./pages_styles.css";
import InputField from "../components/InputField";
import { login } from "../apis/auth";

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login(userId, password);
            console.log("Login Successful:", data);
            setError("");
        } catch (err) {
            setError("Login Failed!");
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2 className="title">User Login</h2>
                {error && <p className="error-message">{error}</p>}
                <InputField label="User ID" type="text" value={userId} onChange={setUserId} />
                <InputField label="Password" type="password" value={password} onChange={setPassword} />
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
