import { Category } from "@/types/category";
import { Transaction } from "@/types/transaction";
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  isBefore,
  startOfDay,
  startOfWeek,
  startOfMonth,
  differenceInDays,
} from "date-fns";

type GroupUnit = "day" | "week" | "month";

function getGroupingUnit(startDate: Date, endDate: Date): GroupUnit {
  const days = differenceInDays(endDate, startDate);

  if (days === 0) return "day";
  if (days <= 30) return "day";
  if (days <= 90) return "week";
  return "month";
}

function generateGroupedLabels(start: Date, end: Date, unit: GroupUnit): string[] {
  const labels: string[] = [];

  // ✅ Caso especial: range de 1 único dia → adiciona dia anterior e posterior
  if (unit === "day" && differenceInDays(end, start) === 0) {
    const prev = format(addDays(start, -1), "dd/MM/yyyy");
    const curr = format(start, "dd/MM/yyyy");
    const next = format(addDays(start, 1), "dd/MM/yyyy");
    return [prev, curr, next];
  }

  let current = start;

  while (isBefore(current, end)) {
    if (unit === "day") {
      labels.push(format(current, "dd/MM/yyyy"));
      current = addDays(current, 1);
    } else if (unit === "week") {
      labels.push(format(startOfWeek(current), "'Sem 'w'-'yy"));
      current = addWeeks(current, 1);
    } else {
      labels.push(format(startOfMonth(current), "MMM yyyy"));
      current = addMonths(current, 1);
    }
  }

  return labels;
}

export function generateLineTransactionChartData(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) {
  const unit = getGroupingUnit(startDate, endDate);
  const labels = generateGroupedLabels(startDate, endDate, unit);

  const matchLabel = (t: Transaction): string => {
    const date = new Date(t.date);
    if (unit === "day") return format(date, "dd/MM/yyyy");
    if (unit === "week") return format(startOfWeek(date), "'Sem 'w'-'yy");
    return format(startOfMonth(date), "MMM yyyy");
  };

  const income = labels.map((label) =>
    transactions
      .filter((t) => t.type === "income" && matchLabel(t) === label)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const expenses = labels.map((label) =>
    transactions
      .filter((t) => t.type === "expense" && matchLabel(t) === label)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const balance = income.map((inc, i) => inc - expenses[i]);

  return {
    labels,
    datasets: [
      {
        label: "Receitas",
        data: income,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.5)",
      },
      {
        label: "Despesas",
        data: expenses,
        borderColor: "#FF4C4C",
        backgroundColor: "rgba(255, 76, 76, 0.5)",
      },
      {
        label: "Saldo",
        data: balance,
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.5)",
      },
    ],
  };
}

export function generateDoughnutCategoriesChartData(transactions: Transaction[], categories: Category[]) {
  // Calculate total number of transactions
  const totalTransactions = transactions.length;

  // Calculate data points and their percentages
  const categoryData = categories.map((category) => {
    const count = transactions.filter((t) => t.category === category.name).length;
    const percentage = totalTransactions > 0 ? (count / totalTransactions) * 100 : 0;
    return {
      count,
      percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal place
      category,
    };
  });

  // Prepare chart data
  const labels = categoryData.map(({ category, percentage }) => `${category.name} (${percentage}%)`);

  const data = categoryData.map(({ count }) => count);
  const backgroundColors = categories.map((category) => category.color);
  const borderColors = categories.map((category) => category.color);

  return {
    labels,
    datasets: [
      {
        label: "Transações",
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
}
