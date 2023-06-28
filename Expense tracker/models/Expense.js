const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  income: { type: Boolean, default: false },
});

module.exports = mongoose.model("Expense", expenseSchema);
