import { Types } from "mongoose";

export interface ITransaction {
  _id: Types.ObjectId;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
  type: "income" | "expense";
}
