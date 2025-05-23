import { Document } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
}
