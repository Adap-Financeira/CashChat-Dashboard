import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import DeleteReminderModal from "../modals/reminder/DeleteReminderModal";
import ReminderModal from "../modals/reminder/ReminderModal";

interface ReminderProps {
  reminder: {
    _id: string;
    userId: string;
    description: string;
    date: string;
    messageId: string;
    createdAt?: Date;
    updatedAt?: Date;
    status: string;
  };
}

export default function Reminder({ reminder }: ReminderProps) {
  const date = new Date(reminder.date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date);
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return (
    <div className="flex flex-col w-full md:max-w-[calc(50%-10px)] items-center justify-between px-3 py-5 gap-2 border rounded-md relative">
      <span
        className="w-2 h-full rounded-md absolute left-0 top-0 rounded-tr-none rounded-br-none"
        style={{ backgroundColor: "#e5a400" }}
      ></span>
      <div className="flex flex-col ml-6 gap-1 w-full">
        <h1 className="text-primary capitalize font-bold text-lg pr-3 text-wrap max-w-[80%]">
          {reminder.description}
        </h1>
        <p className="text-primary text-sm italic">{`${formattedDate} - ${hour}:${minute}h`}</p>
        <p className="text-primary text-sm italic capitalize">
          {reminder.status === "pending" ? "pendente" : "enviado"}
        </p>
      </div>
      <div className="flex gap-0.5 absolute top-2 right-2">
        <ReminderModal data={{ ...reminder, date }}>
          <Button variant="ghost" className="p-2 cursor-pointer hover:text-blue-500">
            <div className="flex justify-center items-center w-6 h-6">
              <Edit width={20} height={20} />
            </div>
          </Button>
        </ReminderModal>
        <DeleteReminderModal reminderId={reminder._id}>
          <Button variant="ghost" className="p-2 cursor-pointer hover:text-destructive">
            <div className="flex justify-center items-center w-6 h-6">
              <Trash width={20} height={20} />
            </div>
          </Button>
        </DeleteReminderModal>
      </div>
    </div>
  );
}
