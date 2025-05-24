import { Types } from "mongoose";

export interface IPermission {
  _id: Types.ObjectId;
  userId: string;
  productId: string;
  phoneNumber: string;
  access: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
