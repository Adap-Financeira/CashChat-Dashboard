import Reminders from "../models/Reminders";
import { CreateReminder, UpdateReminder } from "../types/Reminder";

export async function get(userId: string, limit?: number) {
  if (limit) {
    return await Reminders.find({ userId }).limit(limit);
  }

  return await Reminders.find({ userId });
}

export async function findById(id: string, userId: string) {
  return await Reminders.findOne({ _id: id, userId }).lean();
}

export async function create(data: CreateReminder) {
  return await Reminders.create(data);
}

export async function update(data: UpdateReminder) {
  return await Reminders.updateOne({ _id: data._id }, data);
}

export async function remove(id: string) {
  return await Reminders.deleteOne({ _id: id });
}
