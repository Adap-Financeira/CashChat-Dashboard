import { Document } from "mongoose";

export interface Transaction extends Document {
  hotmartTransactionId: string;
  productId: string;
  customerEmail: string;
  createdAt: Date;
  status: string;
}
