import React, { useState } from "react";
import "./styles.css";
import InputField from "../components/InputField";

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            // TODO: 在这里调用后端API进行身份验证
            console.log("Logging in with", { userId, password });
            // 示例: const response = await fetch("/api/login", { method: "POST", body: JSON.stringify({ userId, password }) });
            // 处理后端返回结果
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
