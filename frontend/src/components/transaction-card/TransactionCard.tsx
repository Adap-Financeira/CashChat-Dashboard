import { BanknoteArrowUp, BanknoteArrowDown, Wallet } from "lucide-react";

interface TransactionCardProps {
  type: "income" | "expense" | "balance";
  amount: number;
  transactionsCount: number;
}

export default function TransactionCard({ type, amount, transactionsCount }: TransactionCardProps) {
  const color = type === "income" ? "bg-green-400" : type === "expense" ? "bg-red-400" : "bg-blue-400";
  const title = type === "income" ? "Receitas" : type === "expense" ? "Despesas" : "Saldo";
  const icon =
    type === "income" ? (
      <BanknoteArrowUp width={20} height={20} className="text-green-400" />
    ) : type === "expense" ? (
      <BanknoteArrowDown width={20} height={20} className="text-red-400" />
    ) : (
      <Wallet width={20} height={20} className="text-blue-400" />
    );
  return (
    <div className="flex flex-col grow bg-background px-6 pt-5 pb-10 rounded-md relative gap-2 shadow-md dark:border">
      <span className={`w-6 h-full ${color} absolute -top-0 -left-1.5 rounded-lg -z-10`} />
      <h1>{title}</h1>
      <span className="text-2xl font-bold">
        {amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </span>
      <span className="text-sm text-muted-foreground">
        {type === "balance"
          ? `Saldo restante das ${transactionsCount} transações.`
          : `Em ${transactionsCount} transaç${
              transactionsCount === 1 ? "ão" : "ões"
            } do tipo ${title.toLowerCase()}.`}
      </span>
      <div className={`flex justify-end absolute top-6 right-6`}>{icon}</div>
    </div>
  );
}
