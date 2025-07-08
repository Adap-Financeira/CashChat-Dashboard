import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().min(11),
  password: z.string().min(6),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export const createTransactionFormSchema = z.object({
  description: z.string().min(1, "Campo descrição é obrigatório"),
  categoryId: z.string().min(1, "Campo categoria é obrigatório"),
  paymentMethodId: z.string().min(1, "Campo forma de pagamento é obrigatório"),
  status: z.enum(["pending", "completed"], {
    required_error: "Campo status é obrigatório",
    invalid_type_error: "Campo status é obrigatório",
  }),
  amount: z.string().min(1, "Campo valor é obrigatório"),
  date: z.date({
    required_error: "Campo data é obrigatório",
    invalid_type_error: "Formato de data inválido",
  }),
  type: z.enum(["income", "expense"], {
    required_error: "Campo tipo é obrigatório",
    invalid_type_error: "Campo tipo é obrigatório",
  }),
  installments: z.string().optional(),
});
export type CreateTransactionFormType = z.infer<typeof createTransactionFormSchema>;

export const updateTransactionFormSchema = z.object({
  description: z.string().min(1, "Campo descrição é obrigatório"),
  categoryId: z.string().min(1, "Campo categoria é obrigatório"),
  status: z.enum(["pending", "completed"], {
    required_error: "Campo status é obrigatório",
    invalid_type_error: "Campo status é obrigatório",
  }),
  amount: z.string().min(1, "Campo valor é obrigatório"),
  date: z.date({
    required_error: "Campo data é obrigatório",
    invalid_type_error: "Formato de data inválido",
  }),
  type: z.enum(["income", "expense"], {
    required_error: "Campo tipo é obrigatório",
    invalid_type_error: "Campo tipo é obrigatório",
  }),
  installments: z.string().optional(),
  paymentMethodId: z.string().optional(),
});
export type UpdateTransactionFormType = z.infer<typeof updateTransactionFormSchema>;

export const deleteTransactionSchema = z.object({
  id: z.string().min(1, "Campo id é obrigatório"),
});
export type DeleteTransactionType = z.infer<typeof deleteTransactionSchema>;
