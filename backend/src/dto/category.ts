export interface CreateCategoryDto {
  name: string;
  color: string;
}

export interface UpdateCategoryDto {
  categoryId: string;
  name?: string;
  color?: string;
}

export interface RemoveCategoryDto {
  categoryId: string;
}
