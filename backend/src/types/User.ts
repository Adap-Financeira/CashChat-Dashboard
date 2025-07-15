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
  email?: string;
  phoneNumber?: string;
  documentType?: string;
  mainActivity?: string;
  password?: string;
}

export interface CreateUser {
  name: string;
  email: string;
  phoneNumber: string;
  documentType: string;
  documentNumber: string;
  companySegment?: string;
  mainActivity?: string;
  password?: string;
}
