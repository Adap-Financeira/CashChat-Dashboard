import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import userStats from "../models/UserStats.js";

export const getUserStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const stats = await userStats.findOne({ userId });

    if (!stats) {
      return res.status(404).json({ error: "Stats not found" });
    }

    const defaultCategories = [
      "gastos fixos",
      "lazer",
      "investimento",
      "conhecimento",
      "doação",
      "outro"
    ];

    const userCategories = stats.createdCategories || [];

    const allCategories = Array.from(
      new Set([...defaultCategories, ...userCategories])
    );

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

    res.json({
      totalIncome: stats.totalIncome,
      totalSpent: stats.totalSpent,
      spendingByCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
