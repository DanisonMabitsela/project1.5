// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ handleGoBackClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          isAdmin,
        }),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to the login page after successful registration
      } else {
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Register as Admin
        </label>
      </div>
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
      <p className="go-back-link" onClick={handleGoBackClick}>
        Go back to Login
      </p>
    </div>
  );
};

export default Register;
