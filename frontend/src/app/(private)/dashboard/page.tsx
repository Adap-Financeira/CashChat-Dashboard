import { getCategories } from "@/api/categories";
import { getYearlySummary } from "@/api/reports";
import { getTransactions } from "@/api/transactions";
import { DoughnutChart } from "@/components/charts/DoughnutChart";
import StackedBarChart from "@/components/charts/StackedBarChart";
import LineTransactionChart from "@/components/charts/TransactionChart";
import DateFilter from "@/components/date-filter/DateFilter";
import RemindersCard from "@/components/reminders-card/RemindersCard";
import TransactionCard from "@/components/transaction-card/TransactionCard";
import {
  generateDoughnutCategoriesChartData,
  generateLineTransactionChartData,
  generateStackedBarChartData,
} from "@/utils/chart-functions";
import { parseDateStringsToObjects, validateOrDefaultDateStrings } from "@/utils/date";
import { redirect } from "next/navigation";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { from, to } = await searchParams;

  // if user only specify the from date, redirect to the same url with from = to
  if (from && !to) {
    redirect(`/dashboard?from=${from}&to=${from}`);
  }

  // startDate and endDate will always be in the format dd/MM/yyyy
  const { startDate, endDate } = validateOrDefaultDateStrings(from || "", to || "");

  // this will return Date objects of the string dates above
  const { startDate: startObj, endDate: endObj } = parseDateStringsToObjects(startDate, endDate);

  const transactions = await getTransactions(startDate, endDate);
  const categories = await getCategories();
  const yearlySummary = await getYearlySummary("2025");

  const lineData = generateLineTransactionChartData(transactions, startObj, endObj);
  const doughnutData = generateDoughnutCategoriesChartData(transactions, categories);
  const stackedBarData = generateStackedBarChartData(yearlySummary);

  const incomeAmount = transactions
    .filter((transaction: any) => transaction.type === "income")
    .reduce((acc: number, transaction: any) => acc + transaction.amount, 0);
  const expenseAmount = transactions
    .filter((transaction: any) => transaction.type === "expense")
    .reduce((acc: number, transaction: any) => acc + transaction.amount, 0);

  return (
    <div className="flex flex-col gap-5 max-h-screen">
      <DateFilter from={startObj} to={endObj} />
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-5">
          <TransactionCard
            type="income"
            amount={incomeAmount}
            transactionsCount={
              transactions.filter((transaction: any) => transaction.type === "income").length
            }
          />
          <TransactionCard
            type="expense"
            amount={expenseAmount}
            transactionsCount={
              transactions.filter((transaction: any) => transaction.type === "expense").length
            }
          />
          <TransactionCard
            type="balance"
            amount={incomeAmount - expenseAmount}
            transactionsCount={transactions.length}
          />
        </div>
        <div className="flex flex-col gap-5 pb-10">
          {/* <RemindersCard /> */}
          <div className="flex flex-col justify-center items-center lg:flex-row gap-5 w-full">
            <LineTransactionChart data={lineData} />
            <StackedBarChart data={stackedBarData} />
          </div>
          <div className="flex flex-col justify-center items-center lg:flex-row gap-5 w-full">
            <DoughnutChart data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}
