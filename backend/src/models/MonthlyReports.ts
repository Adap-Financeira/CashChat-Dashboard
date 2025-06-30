import mongoose from "mongoose";

const monthlyReportSchema = new mongoose.Schema(
  {
	userId: { type: String, required: true }, // user id
	month: { type: Number, required: true }, // month of the report (0-11) january = 0
	year: { type: Number, required: true }, // year of the report
	income: { type: Number, required: true }, // total income for the month
	expense: { type: Number, required: true }, // total expense for the month
	balance: { type: Number, required: true }, // balance for the month
  },
  { timestamps: true }
);

export default mongoose.model("MonthlyReports", monthlyReportSchema);
