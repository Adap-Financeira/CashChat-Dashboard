"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { toast } from "sonner";
import InputText from "@/components/inputs/InputText";
import InputDate from "@/components/inputs/InputDate";
import { getTomorrow } from "@/utils/date";
import { createReminder, updateReminder } from "@/api/reminders";

interface ReminderModalProps {
  children: React.ReactNode;
  data?: {
    _id: string;
    userId: string;
    description: string;
    date: Date;
    messageId: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

interface FormErrors {
  description: string | undefined;
  date: string | undefined;
}

// Modal for create or edit categories
export default function ReminderModal({ children, data }: ReminderModalProps) {
  const [description, setDescription] = useState(data?.description || "");
  const [date, setDate] = useState(data?.date || getTomorrow());
  const [formErrors, setFormErrors] = useState<FormErrors>({
    description: undefined,
    date: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isEdition = !!data;

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      if (!description || !date) {
        setLoading(false);
        setFormErrors({
          description: !description ? "O campo descrição não pode estar vazio." : undefined,
          date: !date ? "Selecione uma data." : undefined,
        });
        return;
      }

      if (date < new Date()) {
        setLoading(false);
        setFormErrors({
          date: "Insira uma data futura para o lembrete.",
          description: undefined,
        });
        return;
      }

      const response = !isEdition
        ? await createReminder(description, date)
        : await updateReminder(description, date, data._id);

      toast.success(response.message);
      resetFormValues();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar lembrete.");
      setLoading(false);
    }
  }

  function resetFormValues() {
    setDescription("");
    setDate(new Date(new Date().setDate(new Date().getDate() + 1)));
    setFormErrors({
      description: undefined,
      date: undefined,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdition ? "Editar lembrete" : "Adicionar lembrete"}</DialogTitle>
            <DialogDescription>
              {isEdition
                ? "Faça alterações no lembrete aqui. Clique em salvar quando terminar."
                : "Preencha os campos abaixo para adicionar um novo lembrete."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5 mb-4">
            <InputText
              label="Descrição"
              id="description"
              name="description"
              placeholder="Ex.: Pagamento de aluguel"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={formErrors.description}
            />

            <InputDate
              label="Data"
              id="date"
              name="date"
              date={date}
              updateDate={(date) => setDate(date)}
              error={formErrors.date}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className="cursor-pointer" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {isEdition ? "Salvar alterações" : "Adicionar lembrete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
