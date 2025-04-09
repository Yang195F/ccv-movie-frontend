import React, { useState } from "react";
import "../styles/pages_styles.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { register } from "../../services/authService";

const RegisterPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await register(userId, password);

    if (result.success) {
      console.log(result.data);
      setSuccessMessage("Registration successful! You can now log in.");
      setError("");
    } else {
      setError(result.message);
      console.log(result.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">User Registration</h2>
        {error && (
          <p className="error-message">
            Registration Failed
            <br />
            {error}
          </p>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
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
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
        <button onClick={() => navigate("/")} className="back-to-login-button">
          Back to login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
