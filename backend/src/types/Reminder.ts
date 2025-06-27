import { ObjectId } from "mongoose";

export interface Reminder {
  _id?: ObjectId;
  userId: string;
  description: string;
  date: Date;
  messageId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
}

export interface CreateReminder {
  userId: string;
  description: string;
  date: Date;
  messageId: string;
}

export interface UpdateReminder {
  _id: string;
  description?: string;
  date?: Date;
  status?: string;
}
