import { z } from "zod";

export const createReminderSchema = z.object({
  description: z.string(),
  date: z.string(),
});

export const updateReminderSchema = z.object({
  reminderId: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
});

export const removeReminderSchema = z.object({
  reminderId: z.string(),
});

export const getSomeRemindersSchema = z.object({
  limit: z.string().optional(),
});
