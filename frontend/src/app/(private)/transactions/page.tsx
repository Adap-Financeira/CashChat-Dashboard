import DateFilter from "@/components/date-filter/DateFilter";
import { parseDateStringsToObjects, validateOrDefaultDateStrings } from "@/utils/date";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { getTransactions } from "@/api/transactions";

export default async function Transactions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { from, to } = await searchParams;

  // if user only specify the from date, redirect to the same url with from = to
  if (from && !to) {
    redirect(`/transactions?from=${from}&to=${from}`);
  }

  // startDate and endDate will always be in the format dd/MM/yyyy
  const { startDate, endDate } = validateOrDefaultDateStrings(from || "", to || "");

  // this will return Date objects of the string dates above
  const { startDate: startObj, endDate: endObj } = parseDateStringsToObjects(startDate, endDate);

  const transactions = await getTransactions(startDate, endDate);

  return (
    <div className="flex flex-col gap-5 max-h-screen mt-5 lg:mt-0">
      <DateFilter from={startObj} to={endObj} />
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold">Transações</h1>
          <p className="text-muted-foreground">
            Aqui você pode ver todas as transações que foram feitas no período selecionado.
          </p>
        </div>
        <DataTable columns={columns} data={transactions || []} />
      </div>
    </div>
  );
}
