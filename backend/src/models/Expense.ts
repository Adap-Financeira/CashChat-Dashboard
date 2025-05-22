import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  messageId: { type: String, required: true },
});

export default mongoose.model("Expense", expenseSchema);
