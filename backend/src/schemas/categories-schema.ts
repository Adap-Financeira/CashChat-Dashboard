import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string(),
  color: z.string(),
});

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  categoryId: z.string(),
  name: z.string().optional(),
  color: z.string().optional(),
});

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;

export const removeCategorySchema = z.object({
  categoryId: z.string(),
});

export type RemoveCategoryType = z.infer<typeof removeCategorySchema>;
