import { z } from "zod";

export const createReminderSchema = z.object({
  description: z.string(),
  date: z.string(),
});

export type CreateReminderType = z.infer<typeof createReminderSchema>;

export const updateReminderSchema = z.object({
  reminderId: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
});

export type UpdateReminderType = z.infer<typeof updateReminderSchema>;

export const removeReminderSchema = z.object({
  reminderId: z.string(),
});

export type RemoveReminderType = z.infer<typeof removeReminderSchema>;

export const limitSchema = z.object({
  limit: z.string().optional(),
});
