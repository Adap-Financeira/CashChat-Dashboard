import { Document } from "mongoose";

export interface IUser extends Document {
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
