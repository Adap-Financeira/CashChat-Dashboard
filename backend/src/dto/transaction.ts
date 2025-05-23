export interface TransactionDto {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
}
