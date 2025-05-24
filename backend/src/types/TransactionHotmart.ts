import { Types } from "mongoose";

export interface ITransactionHotmart {
  _id: Types.ObjectId;
  hotmartTransactionId: string;
  productId: string;
  customerEmail: string;
  createdAt: Date;
  status: string;
}
