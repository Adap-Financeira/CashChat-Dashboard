import { z } from "zod";

export const validateSchema = z.object({
  id: z.string().min(1, "Código inválido"),
  email: z.string().email("Email inválido"),
});
