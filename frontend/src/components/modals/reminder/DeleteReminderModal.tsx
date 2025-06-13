"use client";
import { deleteReminder } from "@/api/reminders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomError } from "@/utils/custom-error";
import { useState } from "react";
import { toast } from "sonner";

interface ReminderModalProps {
  reminderId: string;
  children?: React.ReactNode;
}

// Modal for delete category
export default function DeleteReminderModal({ reminderId, children }: ReminderModalProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await deleteReminder(reminderId);

    if (res instanceof CustomError) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }

    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="pr-6">Excluir lembrete</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este lembrete? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer hover:bg-destructive hover:text-white"
              disabled={loading}
            >
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
