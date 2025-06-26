import { getCookie } from "@/app/actions";
import DateFilter from "@/components/date-filter/DateFilter";
import RemindersCard from "@/components/reminders-card/RemindersCard";
import TransactionCard from "@/components/transaction-card/TransactionCard";
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

  const cookie = await getCookie("token");

  // We should call the fetch api here with the startDate and endDate
  // Create in the backend the endpoint to retrieve all user transactions in the specified period
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction/all?from=${startDate}&to=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie};`,
      },
      credentials: "include",
      cache: "no-store",
    }
  );
  const transactions = await data.json();

  const incomeAmount = transactions
    .filter((transaction: any) => transaction.type === "income")
    .reduce((acc: number, transaction: any) => acc + transaction.amount, 0);
  const expenseAmount = transactions
    .filter((transaction: any) => transaction.type === "expense")
    .reduce((acc: number, transaction: any) => acc + transaction.amount, 0);

  // this will return Date objects of the string dates above
  const { startDate: startObj, endDate: endObj } = parseDateStringsToObjects(startDate, endDate);

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
        <div className="flex flex-wrap">
          <RemindersCard />
        </div>
      </div>
    </div>
  );
}
