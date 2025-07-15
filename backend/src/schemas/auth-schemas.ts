import { z } from "zod";
import { cpf, cnpj } from "cpf-cnpj-validator";

// A helper function to remove all non-digit characters
const cleanDocument = (doc: string) => doc.replace(/\D/g, "");
const cleanNonDigits = (value: string) => value.replace(/\D/g, "");
const nameRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/;

// Base schema for common user fields
const userBaseSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .regex(nameRegex, "O nome deve conter apenas letras e espaços."),
  email: z.string().email("Email inválido."),
  phoneNumber: z
    .string()
    .transform(cleanNonDigits) // First, remove all non-numeric characters
    .pipe(
      z
        .string() // Then, validate the result
        .min(13, "O telefone deve ter pelo menos 13 dígitos (DDD + número).")
        .max(13, "O telefone deve ter no máximo 13 dígitos (DDD + número).")
    ),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

// Schema for CPF
const cpfSchema = userBaseSchema.extend({
  documentType: z.literal("CPF", {
    errorMap: () => ({ message: "Tipo de documento inválido. Selecione CPF." }),
  }),
  documentNumber: z
    .string()
    .transform(cleanDocument) // Clean before validation
    .refine(cpf.isValid, "CPF inválido."), // Validate using the library
});

// Schema for CNPJ
const cnpjSchema = userBaseSchema.extend({
  documentType: z.literal("CNPJ", {
    errorMap: () => ({ message: "Tipo de documento inválido. Selecione CNPJ." }),
  }),
  documentNumber: z
    .string()
    .transform(cleanDocument) // Clean before validation
    .refine(cnpj.isValid, "CNPJ inválido."), // Validate using the library
  companySegment: z.string().optional(),
  mainActivity: z.string().optional(),
});

// The final discriminated union schema
// Zod will first look at `documentType`. Based on its value ('CPF' or 'CNPJ'),
// it will apply the corresponding validation rules.
export const RegisterSchema = z.discriminatedUnion("documentType", [cpfSchema, cnpjSchema]);

// Infer the TypeScript type from the schema for type safety
export type RegisterInput = z.infer<typeof RegisterSchema>;

// export const RegisterSchema = z.object({
//   email: z.string().email("Email inválido."),
//   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
//   phoneNumber: z.string().min(11, "O telefone deve ter pelo menos 11 caracteres."),
//   documentType: z.enum(["CPF", "CNPJ"]),
//   documentNumber: z.string(),
//   companySegment: z.string().optional(),
//   mainActivity: z.string().optional(),
//   password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
// });

export const RegisterPasswordSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const LoginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const EmailSchema = z.object({
  email: z.string().email("Email inválido."),
});
