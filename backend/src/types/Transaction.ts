import { Types } from "mongoose";

// Type for the transaction returned from the database
export interface ITransaction {
  _id: Types.ObjectId;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
  status: "pending" | "completed";
  paymentMethod: "cash" | "credit" | "debit" | "pix";

  //Only for expenses
  installmentsCount: number; // Total of installments
  installmentsCurrent: number; // Current installment
  installmentsGroupId: string; // Id for all installments of the same buy
}

// Type for the transaction to be created
export interface CreateTransaction {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
  status: "pending" | "completed";
  paymentMethod: "cash" | "credit" | "debit" | "pix";
}

// Type for the transaction with installments to be created
export interface CreateInstallmentTransaction {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
  status: "pending" | "completed";
  paymentMethod: "cash" | "credit" | "debit" | "pix";
  installmentsCount: number;
  installmentsCurrent: number;
  installmentsGroupId: string;
}
