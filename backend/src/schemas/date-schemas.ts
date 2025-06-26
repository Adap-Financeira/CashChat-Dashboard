import { z } from "zod";

export const dateSchema = z.object({
  from: z.string(),
  to: z.string(),
});
