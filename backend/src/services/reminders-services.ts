import * as remindersRepository from "../repositories/reminders-repository";
import { CreateReminderType, RemoveReminderType, UpdateReminderType } from "../schemas/reminders-schema";
import { CustomError } from "../utils/errors";
import { findUserByEmail } from "./user-service";
import { nanoid } from "nanoid";

export async function getRemindersByEmail(email: string, limit?: number) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }

  return await remindersRepository.get(user._id.toString(), limit);
}

export async function createReminder(email: string, data: CreateReminderType) {
  const user = await findUserByEmail(email);
  // convert date to date object from string
  const formattedDate = new Date(data.date);

  // Check if the date is in the past
  if (formattedDate < new Date()) {
    throw new CustomError("A data precisa ser uma data futura.", 400);
  }

  return await remindersRepository.create({
    userId: user._id.toString(),
    description: data.description,
    date: formattedDate,
    messageId: nanoid(8),
  });
}

export async function updateReminder(email: string, data: UpdateReminderType) {
  const user = await findUserByEmail(email);
  let formattedDate;

  if (data.date) {
    formattedDate = new Date(data.date);

    if (formattedDate < new Date()) {
      throw new CustomError("A data precisa ser uma data futura.", 400);
    }
  }

  const reminder = await remindersRepository.findById(data.reminderId, user._id.toString());
  if (!reminder) {
    throw new CustomError("Lembrete não encontrado.", 404);
  }

  return await remindersRepository.update({
    _id: data.reminderId,
    description: data.description,
    date: formattedDate,
  });
}

export async function removeReminder(email: string, data: RemoveReminderType) {
  const user = await findUserByEmail(email);
  const reminder = await remindersRepository.findById(data.reminderId, user._id.toString());
  if (!reminder) {
    throw new CustomError("Lembrete não encontrado.", 404);
  }

  if (reminder.userId !== user._id.toString()) {
    throw new CustomError("Você não tem permissão para realizar essa ação", 403);
  }

  return await remindersRepository.remove(data.reminderId);
}
