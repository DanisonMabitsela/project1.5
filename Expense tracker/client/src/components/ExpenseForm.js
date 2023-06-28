import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSaveExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    if (amount.trim() === "" || description.trim() === "") {
      console.log("Please fill in all fields");
      return;
    }

    const expenseData = {
      amount: +amount, // Convert amount to number
      description,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });
      if (response.ok) {
        onSaveExpense();
        // Reset the form fields
        setAmount("");
        setDescription("");
      } else {
        console.log("Failed to create expense");
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div>
      <h2>Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Save Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
