const express = require("express");
const jwt = require("jsonwebtoken");
const Expense = require("../models/Expense");
const User = require("../models/User");
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.userId = decoded.userId;
    next();
  });
};

// Create an expense
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { amount, description } = req.body;
    const expense = new Expense({ amount, description, userId: req.userId });
    await expense.save();
    res.status(201).json({ message: "Expense created successfully" });
  } catch (error) {
    console.error("Error creating expense", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get all expenses
router.get("/", authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.json(expenses);
  } catch (error) {
    console.error("Error getting expenses", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update an expense
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { amount, description } = req.body;
    await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { amount, description }
    );
    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error("Error updating expense", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete an expense
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
