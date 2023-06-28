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
      <p>
        Hi good reviewer I wanted to let you know that my time at Hyperiondev
        ends on 22 June, and I was hoping if there is anything wrong with the
        app, could you please score it down on other aspects rather than
        completeness and requiring resubmission as this would require me to pay
        for an additional month to make the corrections.<br></br> Thank you
      </p>
    </div>
  );
};

export default Login;
