"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paymentMethods } from "@/utils/payments";

export type Transaction = {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    cell: ({ row }) => {
      const paymentMethod = row.getValue("paymentMethod") as string;
      return <div>{paymentMethods[paymentMethod as keyof typeof paymentMethods] || "n/a"}</div>;
    },
    header: "Forma de pagamento",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <div>{status === "completed" ? "Concluído" : "Pendente"}</div>;
    },
    header: "Status",
  },
  {
    accessorKey: "type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="flex justify-center items-center">
          <span className={`px-2 ${type === "income" ? "bg-green-500" : "bg-red-500"}  w-4 h-4 rounded-full`}>
            {/* {type === "income" ? "Recebimento" : "Despesa"} */}
          </span>
        </div>
      );
    },
    header: () => <div className="text-center">Tipo</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      const type = row.getValue("type");
      return (
        <div className="text-right">
          {type === "income" ? (
            <div className="text-green-500">{formatted}</div>
          ) : (
            <div className="text-red-500">{formatted}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const stringDate = row.getValue("date") as string;
      const date = new Date(stringDate);
      const formattedDate = date.toLocaleDateString("pt-BR");
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 justify-center">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                {" "}
                <Trash className="mr-2 h-4 w-4 text-red-500" /> Apagar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
