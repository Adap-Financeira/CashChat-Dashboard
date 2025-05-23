import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  hotmartTransactionId: { type: String, required: true, unique: true },
  productId: { type: String, required: true },
  customerEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

export default mongoose.model("TransactionsHotmart", transactionSchema);
