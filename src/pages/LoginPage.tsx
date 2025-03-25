import React, { useState } from "react";
import "./pages_styles.css";
import InputField from "../components/InputField";

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            // TODO: API use at here
            console.log("Logging in with", { userId, password });
        } catch (err) {
            setError("Failed to login. Please check your credentials and try again.");
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
