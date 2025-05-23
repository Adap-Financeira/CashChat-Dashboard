import { Document } from "mongoose";

export interface ITransactionHotmart extends Document {
  hotmartTransactionId: string;
  productId: string;
  customerEmail: string;
  createdAt: Date;
  status: string;
}
