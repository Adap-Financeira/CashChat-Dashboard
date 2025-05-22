import { Document } from "mongoose";

export interface IPermission extends Document {
  userId: string;
  productId: string;
  phoneNumber: string;
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
