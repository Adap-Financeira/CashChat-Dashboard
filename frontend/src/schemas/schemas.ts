import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});
