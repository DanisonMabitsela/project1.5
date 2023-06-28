require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
