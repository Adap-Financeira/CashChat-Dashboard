import Income from "../models/Income";
import Expense from "../models/Expense";
import userStats from "../models/UserStats";
import { defaultCategories } from "../utils/categories";
import { CustomError } from "../utils/errors";

export const getUserStats = async (userId: string) => {
  try {
    const stats = await userStats.findOne({ userId });

    if (!stats) {
      throw new CustomError("Stats not found", 404);
    }

    const userCategories = stats.createdCategories || [];

    const allCategories = Array.from(new Set([...defaultCategories, ...userCategories]));

    const spendingByCategory = await Promise.all(
      allCategories.map(async (category) => {
        const expenseResult = await Expense.aggregate([
          {
            $match: {
              userId,
              category: { $regex: new RegExp(`^${category.trim()}$`, "i") },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        const incomeResult = await Income.aggregate([
          {
            $match: {
              userId,
              category: { $regex: new RegExp(`^${category.trim()}$`, "i") },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        return {
          category,
          totalExpenses: expenseResult.length ? expenseResult[0].total : 0,
          totalIncome: incomeResult.length ? incomeResult[0].total : 0,
        };
      })
    );

    return {
      totalIncome: stats.totalIncome,
      totalSpent: stats.totalSpent,
      spendingByCategory,
    };
  } catch (error) {
    throw error;
  }
};
