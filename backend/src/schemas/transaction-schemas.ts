import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z.string(),
  categoryId: z.string(),
  paymentMethodId: z.string(),
  status: z.enum(["pending", "completed"]),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string(),
  installmentsCount: z.number().optional(),
  messageId: z.string().optional(),
});

export const updateTransactionSchema = z.object({
  transactionId: z.string(),
  data: z.object({
    description: z.string(),
    categoryId: z.string(),
    status: z.enum(["pending", "completed"]),
    type: z.enum(["income", "expense"]),
    amount: z.number(),
    date: z.string(),
  }),
});

export const removeTransactionSchema = z.object({
  transactionId: z.string(),
});

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>;
export type RemoveTransactionType = z.infer<typeof removeTransactionSchema>;
