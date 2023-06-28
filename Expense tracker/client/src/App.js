import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header.js";
import Sidebar from "./components/Sidebar";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "./App.css";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // Redirect to the login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token); // Store the token in localStorage
        setIsLoggedIn(true);
        console.log("Login successful");
        console.log("Token:", token); // Log the token
        console.log("Username:", username); // Log the username
      } else {
        // Login failed
        setIsLoggedIn(false);
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      console.log("Logging in as:", username);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegisterClick = () => {
    // Handle the register link click
    console.log("Register link clicked");
  };

  const handleSaveExpense = (expenseData) => {
    // Perform logic to save expense data here
    console.log("Saving expense:", expenseData);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<ExpenseList />} />
              <Route
                path="/expenses/new"
                element={<ExpenseForm onSaveExpense={handleSaveExpense} />}
              />
              <Route
                path="/expenses/:id/edit"
                element={<ExpenseForm onSaveExpense={handleSaveExpense} />}
              />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  handleRegisterClick={handleRegisterClick}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route
              path="/register"
              element={<Register handleGoBackClick={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        {isLoggedIn && <Logout onLogout={handleLogout} />}
      </div>
    </Router>
  );
}

export default App;
