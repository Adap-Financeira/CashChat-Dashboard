import Reminders from "@/components/reminders/Reminders";
import { getReminders } from "@/api/reminders";

export default async function RemindersPage() {
  const reminders = await getReminders();

  return (
    <div className="flex flex-col gap-5 max-h-screen">
      <div className="flex flex-col gap-5">
        <div className="mt-3">
          <h1 className="text-xl font-bold">Lembretes</h1>
          <p className="text-muted-foreground">
            Salve compromissos importantes e nós cuidamos de te lembrar.
          </p>
        </div>
        <div className="flex gap-5 w-full">
          <Reminders reminders={reminders} />
        </div>
      </div>
    </div>
  );
}
