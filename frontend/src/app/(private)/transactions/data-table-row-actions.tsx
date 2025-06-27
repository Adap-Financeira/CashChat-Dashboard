import { Transaction } from "@/types/transaction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { List, Edit, Copy, Trash } from "lucide-react";
import DeleteTransactionModal from "@/components/modals/transaction/DeleteTransactionModal";
import { useState } from "react";
import EditTransactionModal from "@/components/modals/transaction/EditTransactionModal";
import { toast } from "sonner";
interface DataTableRowActionsProps {
  transaction: Transaction;
}

export default function DataTableRowActions({ transaction }: DataTableRowActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      <DeleteTransactionModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        id={transaction._id}
      />
      <EditTransactionModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} data={transaction} />
      <div className="flex justify-center">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 justify-center">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              {" "}
              <List className="mr-2 h-4 w-4" />
              Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
              {" "}
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(transaction._id);
                toast.success("Id copiado para a área de transferência");
              }}
            >
              {" "}
              <Copy className="mr-2 h-4 w-4" />
              Copiar id
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
              {" "}
              <Trash className="mr-2 h-4 w-4 text-red-500" /> Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
