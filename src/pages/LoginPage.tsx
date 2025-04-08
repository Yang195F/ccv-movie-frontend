import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages_styles.css";
import InputField from "../components/InputField";
import { login } from "../services/authService";

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(userId, password);

    if (result.success) {
      console.log("Login Successful:", result.data);
      setError("");
    } else {
      setError("Got Error");
      console.log("Login Failed:", result.message);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">User Login</h2>
        {error && <p className="error-message">{error}</p>}
        <InputField
          label="User ID"
          type="text"
          value={userId}
          onChange={setUserId}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="to-register-button"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
