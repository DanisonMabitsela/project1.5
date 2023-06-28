const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
