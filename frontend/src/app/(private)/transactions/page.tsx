import DateFilter from "@/components/date-filter/DateFilter";
import { parseDateStringsToObjects, validateOrDefaultDateStrings } from "@/utils/date";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { DataTable } from "./data-table";
import { columns } from "./colums";

export default async function Transactions({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { from, to } = await searchParams;

  // if user only specify the from date, redirect to the same url with from = to
  if (from && !to) {
    redirect(`/transactions?from=${from}&to=${from}`);
  }

  // startDate and endDate will always be in the format dd/MM/yyyy
  const { startDate, endDate } = validateOrDefaultDateStrings(from || "", to || "");

  const getCookie = async (name: string) => {
    return (await cookies()).get(name)?.value ?? "";
  };

  const cookie = await getCookie("token");

  // We should call the fetch api here with the startDate and endDate
  // Create in the backend the endpoint to retrieve all user transactions in the specified period
  const data = await fetch(`${process.env.API_URL}/api/transaction/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${cookie};`,
    },
    credentials: "include",
    cache: "no-store",
  });
  const transactions = await data.json();

  // this will return Date objects of the string dates above
  const { startDate: startObj, endDate: endObj } = parseDateStringsToObjects(startDate, endDate);

  return (
    <div className="flex flex-col gap-5 max-h-screen">
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
