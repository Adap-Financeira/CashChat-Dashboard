import { Types } from "mongoose";

// Type for the transaction returned from the database
export interface ITransaction {
  _id: Types.ObjectId;
  userId: string;
  amount: number;
  description: string;
  categoryId: { name: string; _id: Types.ObjectId };
  date: Date;
  messageId: string;
  type: "income" | "expense";
  status: "pending" | "completed";
  paymentMethodId: { type: string; _id: Types.ObjectId };
  installmentsCount: number; // Total of installments
  installmentsCurrent: number; // Current installment
  installmentsGroupId: string; // Id for all installments of the same buy
}

// Type for the transaction to be created
export interface CreateTransaction {
  userId: string;
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
  status: "pending" | "completed";
  paymentMethodId: string;
  installmentsCount?: number;
  installmentsCurrent?: number;
  installmentsGroupId?: string;
}

// Type for the transaction to be updated
export interface UpdateTransaction {
  amount?: number;
  description?: string;
  categoryId?: string;
  date?: Date;
  type?: "income" | "expense";
  status?: "pending" | "completed";
}
