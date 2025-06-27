"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReminderModal from "../modals/reminder/ReminderModal";
import Reminder from "../reminder/Reminder";

interface RemindersProps {
  reminders: {
    _id: string;
    userId: string;
    description: string;
    date: string;
    messageId: string;
    createdAt?: Date;
    updatedAt?: Date;
    status: string;
  }[];
}
export default function Reminders({ reminders }: RemindersProps) {
  const [search, setSearch] = useState("");

  const filteredReminders = reminders.filter((reminder) =>
    reminder.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between py-1">
        <Input
          className="w-[40%]"
          placeholder="Descrição do lembrete"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ReminderModal>
          <Button className="cursor-pointer">Adicionar lembrete</Button>
        </ReminderModal>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:flex-wrap">
        {filteredReminders.length === 0 && (
          <p className="text-center text-muted-foreground mt-7">Nenhum lembrete cadastrado.</p>
        )}
        {filteredReminders.map((reminder) => (
          <Reminder key={reminder._id} reminder={reminder} />
        ))}
      </div>
    </div>
  );
}
