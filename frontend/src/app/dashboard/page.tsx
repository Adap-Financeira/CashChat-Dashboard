import DateFilter from "@/components/date-filter/DateFilter";
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

  // We should call the fetch api here with the startDate and endDate

  // this will return Date objects of the string dates above
  const { startDate: startObj, endDate: endObj } = parseDateStringsToObjects(startDate, endDate);

  return (
    <div className="flex flex-col gap-5 max-h-screen">
      <DateFilter from={startObj} to={endObj} />
    </div>
  );
}
