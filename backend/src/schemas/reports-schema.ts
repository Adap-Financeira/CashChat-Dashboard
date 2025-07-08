import { z } from "zod";

export const yearSchema = z.object({
  year: z.string().transform((value) => Number(value)),
});
