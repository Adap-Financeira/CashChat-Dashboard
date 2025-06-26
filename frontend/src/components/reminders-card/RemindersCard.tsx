import { getCookie } from "@/app/actions";

export default async function RemindersCard() {
  const reminders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reminders/all?limit=5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${await getCookie("token")};`,
    },
    credentials: "include",
    cache: "no-store",
  });
  const data = await reminders.json();
  console.log(data);

  return (
    <div className="flex flex-col grow bg-background px-6 pt-5 pb-10 rounded-md relative gap-2 shadow-md dark:border">
      <span className="w-6 h-full bg-blue-400 absolute -top-0 -left-1.5 rounded-lg -z-10" />
      <h1>Lembretes</h1>
      <span className="text-2xl font-bold">{data.length}</span>
      <span className="text-sm text-muted-foreground">
        {data.length === 0 ? "Sem lembretes ativos." : ""}
      </span>
    </div>
  );
}
