import * as transactionRepository from "../repositories/transaction-repository";
import * as monthlyReportsRepository from "../repositories/monthly-reports-repository";
import { CreateMonthlyReport } from "../types/monthly-reports";
import { CustomError } from "../utils/errors";
import * as userService from "./user-service";

export async function createMonthlyReport(userId: string, month: number, year: number) {
  try {
    // Get all transactions for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // day 0 of next month = last day of current month

    // Get all transactions for the month
    const transactions = await transactionRepository.getAllByDateRange(userId, startDate, endDate);

    // Calculate the total income and expense
    const income = transactions.reduce(
      (acc, transaction) => (transaction.type === "income" ? acc + transaction.amount : acc),
      0
    );
    const expense = transactions.reduce(
      (acc, transaction) => (transaction.type === "expense" ? acc + transaction.amount : acc),
      0
    );

    const monthlyReport: CreateMonthlyReport = {
      userId,
      month,
      year,
      income,
      expense,
      balance: income - expense,
    };

    // Create the monthly report
    await monthlyReportsRepository.create(monthlyReport);
  } catch (error) {
    throw error;
  }
}

export async function getMonthlyReport(userId: string, month: number, year: number) {
  try {
    const monthlyReport = await monthlyReportsRepository.get(userId, month, year);

    if (!monthlyReport) {
      throw new CustomError("Relatório não encontrado", 404);
    }

    return monthlyReport;
  } catch (error) {
    throw error;
  }
}

export async function createMonthlyReportsForAllUsers(month: number, year: number) {
  const users = await userService.getAllUsers();

  for (const user of users) {
    await createMonthlyReport(user._id.toString(), month, year);
  }
}
