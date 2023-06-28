import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ handleRegisterClick, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Access the navigate function for redirection

  const handleLoginClick = () => {
    handleLogin(username, password);
    console.log("Logging in as:", username);
  };

  const handleRedirectToRegister = () => {
    handleRegisterClick();
    navigate("/register"); // Redirect to the register page using the navigate function
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLoginClick} className="login-button">
        Login
      </button>
      <p className="register-link">
        Don't have an account?{" "}
        <span onClick={handleRedirectToRegister} className="register-link-text">
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
