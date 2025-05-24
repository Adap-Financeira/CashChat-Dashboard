import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
  currentSubscription?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUser {
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
}
