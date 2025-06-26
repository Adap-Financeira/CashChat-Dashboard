import { z } from "zod";

const createTransactionSchema = z.object({
  description: z.string(),
  categoryId: z.string(),
  paymentMethodId: z.string(),
  status: z.enum(["pending", "completed"]),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.date(),
  installmentsCount: z.number(),
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
const deleteTransactionSchema = z.object({
  id: z.string(),
});

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>;
export type DeleteTransactionType = z.infer<typeof deleteTransactionSchema>;
