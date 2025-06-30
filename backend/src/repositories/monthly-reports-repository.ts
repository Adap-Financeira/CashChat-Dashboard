import MonthlyReports from "../models/MonthlyReports";
import { CreateMonthlyReport } from "../types/monthly-reports";

export async function create(data: CreateMonthlyReport) {
  return await MonthlyReports.create(data);
}

export async function get(userId: string, month: number, year: number) {
  return await MonthlyReports.findOne({ userId, month, year }).lean();
}
