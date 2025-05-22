import { Document } from "mongoose";

export interface Income extends Document {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  messageId: string;
}
