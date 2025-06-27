// Type for the transaction returned from the database
export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
  status: "pending" | "completed";
  paymentMethod: string;
  installmentsCount: number;
  installmentsCurrent: number;
  installmentsGroupId: string;
}