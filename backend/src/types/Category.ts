import { ObjectId } from "mongoose";

export interface Category {
  userId: string;
  name: string;
  color: string;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategory {
  userId: string;
  name: string;
  color: string;
}

export interface UpdateCategory {
  name?: string;
  color?: string;
}
