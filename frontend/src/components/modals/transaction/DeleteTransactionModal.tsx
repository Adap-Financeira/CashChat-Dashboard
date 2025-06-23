"use client";
import { deleteTransaction } from "@/api/transactions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteTransactionModalProps {
  id: string;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

// Modal for delete category
export default function DeleteTransactionModal({ id, open, onOpenChange }: DeleteTransactionModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      await deleteTransaction({ id });
      toast.success("Transação excluída com sucesso.");
      setLoading(false);
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao excluir transação.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja excluir esta transação?</DialogTitle>
            <DialogDescription>
              ATENÇÃO: Esta ação não pode ser desfeita. <br /> Se esta transação for do tipo crédito com parcelas,
              todas as transações desta mesma compra serão excluídas.
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
