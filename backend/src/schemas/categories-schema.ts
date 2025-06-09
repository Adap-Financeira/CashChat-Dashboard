import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string(),
  color: z.string(),
});

export const updateCategorySchema = z.object({
  categoryId: z.string(),
  name: z.string().optional(),
  color: z.string().optional(),
});

export const removeCategorySchema = z.object({
  categoryId: z.string(),
});
