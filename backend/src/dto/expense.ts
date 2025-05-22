export interface ExpenseDto {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
}
