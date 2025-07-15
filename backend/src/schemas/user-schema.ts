import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  firebaseId: z.string().optional(),
  phoneNumber: z.string(),
  email: z.string().email(),
  documentType: z.enum(["CPF", "CNPJ"]),
  documentNumber: z.string(),
  companySegment: z.string().optional(),
  mainActivity: z.string().optional(),
  password: z.string().min(6),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
