import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Email inválido."),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  phoneNumber: z.string().min(11, "O telefone deve ter pelo menos 11 caracteres."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const RegisterPasswordSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const LoginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});
