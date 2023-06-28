import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import "./ExpenseList.css";
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Log the token
      const response = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.log("Failed to fetch expenses");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleUpdateExpense = async (id, amount, description) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description }),
      });
      if (response.ok) {
        fetchExpenses();
      } else {
        console.log("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchExpenses();
      } else {
        console.log("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const totalIncome = () => {
    let income = 0;
    expenses.forEach((expense) => {
      if (expense.amount > 0) {
        income += expense.amount;
      }
    });
    return income;
  };

  const totalExpenses = () => {
    let expensesTotal = 0;
    expenses.forEach((expense) => {
      if (expense.amount < 0) {
        expensesTotal += expense.amount;
      }
    });
    return Math.abs(expensesTotal);
  };

  const totalBalance = () => {
    let balance = 0;
    expenses.forEach((expense) => {
      balance += expense.amount;
    });
    return balance;
  };

  return (
    <div className="dashboard">
      <h1>All Transactions</h1>
      <div className="stats-con">
        <div className="amount-con">
          <div className="income">
            <h2>Total Income</h2>
            <p>Rand {totalIncome()}</p>
          </div>
          <div className="expense">
            <h2>Total Expense</h2>
            <p>Rand {totalExpenses()}</p>
          </div>
          <div className="balance">
            <h2>Total Balance</h2>
            <p>Rand {totalBalance()}</p>
          </div>
        </div>
        <div className="history-con">
          <ExpenseForm onSaveExpense={fetchExpenses} />
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id}>
                <div>Amount: {expense.amount}</div>
                <div>Description: {expense.description}</div>
                <button
                  onClick={() =>
                    handleUpdateExpense(
                      expense._id,
                      expense.amount + 1,
                      expense.description
                    )
                  }
                >
                  Increment Amount
                </button>
                <button onClick={() => handleDeleteExpense(expense._id)}>
                  Delete Expense
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
