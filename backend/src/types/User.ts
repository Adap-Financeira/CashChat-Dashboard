import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firebaseId?: string | null;
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
  currentSubscription?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUser {
  firebaseId?: string | null;
  name?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export interface CreateUser {
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
}
