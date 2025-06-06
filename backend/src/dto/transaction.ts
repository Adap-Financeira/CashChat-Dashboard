export interface TransactionDto {
  userId: string;
  amount: number;
  description: string;
  category: string;
  messageId: string;
  type: "income" | "expense";
  paymentMethod: "cash" | "credit" | "debit" | "pix";
  status: "pending" | "completed";
}

export interface TransactionInstallmentsDto {
  userId: string;
  amount: number;
  description: string;
  category: string;
  messageId: string;
  type: "income" | "expense";
  paymentMethod: "cash" | "credit" | "debit" | "pix";
  status: "pending" | "completed";
  installmentsCount: number;
  installmentsCurrent: number;
}
