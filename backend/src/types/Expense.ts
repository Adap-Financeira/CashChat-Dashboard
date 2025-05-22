import { Document } from "mongoose";

export interface Expense extends Document {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
}
