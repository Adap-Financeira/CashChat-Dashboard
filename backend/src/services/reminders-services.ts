import * as remindersRepository from "../repositories/reminders-repository";
import { CustomError } from "../utils/errors";
import { findUserByEmail } from "./user-service";
import { nanoid } from "nanoid";

export async function getAllRemindersByUser(email: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }

  return await remindersRepository.getAll(user._id.toString());
}

export async function getSomeRemindersByUser(email: string, limit: number) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }

  return await remindersRepository.getSome(limit, user._id.toString());
}

export async function createReminder(email: string, description: string, date: Date) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }

  if (date < new Date()) {
    throw new CustomError("A data precisa ser uma data futura.", 400);
  }

  return await remindersRepository.create({
    userId: user._id.toString(),
    description,
    date,
    messageId: nanoid(8),
  });
}

export async function updateReminder(reminderId: string, description: string, date: Date) {
  if (date < new Date()) {
    throw new CustomError("A data precisa ser uma data futura.", 400);
  }

  const reminder = await remindersRepository.findById(reminderId);
  if (!reminder) {
    throw new CustomError("Lembrete não encontrado.", 404);
  }

  return await remindersRepository.update({
    _id: reminderId,
    description,
    date,
  });
}

export async function removeReminder(reminderId: string) {
  return await remindersRepository.remove(reminderId);
}
