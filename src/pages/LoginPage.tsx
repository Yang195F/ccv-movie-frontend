import React, { useState } from "react";
import "./styles.css";
import InputField from "../components/InputField";

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost:7094/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, password }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Login Successfully", data);
            } else {
                console.error("Failed to login.", data.message);
                setError(data.message);
            }
        } catch (err) {
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
