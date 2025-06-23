import * as categoryRepository from "../repositories/category-repository";
import * as userRepository from "../repositories/user-repository";
import * as colorsRepository from "../repositories/colors-repository";
import { CreateCategoryDto, UpdateCategoryDto, RemoveCategoryDto } from "../dto/category";
import { CustomError } from "../utils/errors";

export async function getAllCategories(email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }

  return categoryRepository.getAll(user._id.toString());
}

export async function createCategoryWithEmail(categoryDto: CreateCategoryDto, email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new CustomError("Usuário não encontrado.", 404);
  }

  // Check if category already exists
  const categoryExists = await categoryRepository.getByName(categoryDto.name.toLowerCase());

  if (categoryExists) {
    throw new CustomError("Essa categoria já existe.", 400);
  }

  // Check if colors exists
  const colorsExists = await colorsRepository.getByValue(categoryDto.color);

  if (!colorsExists) {
    throw new CustomError("Essa cor não foi encontrada ou não esta disponivel no momento.", 404);
  }

  return categoryRepository.create({
    ...categoryDto,
    name: categoryDto.name.toLowerCase(),
    userId: user._id.toString(),
  });
}

export async function updateCategory(categoryDto: UpdateCategoryDto) {
  console.log(categoryDto);
  // Check if category already exists
  const categoryExists = categoryDto.name
    ? await categoryRepository.getByName(categoryDto.name.toLowerCase())
    : null;

  console.log(categoryExists);

  if (categoryExists && categoryDto.categoryId !== categoryExists._id.toString()) {
    throw new CustomError("Essa categoria já existe.", 400);
  }

  // Check if colors exists
  const colorsExists = categoryDto.color ? await colorsRepository.getByValue(categoryDto.color) : null;

  if (!colorsExists) {
    throw new CustomError("Essa cor não foi encontrada ou não esta disponivel no momento.", 404);
  }
  return categoryRepository.update(categoryDto.categoryId, categoryDto);
}

export async function removeCategory(categoryDto: RemoveCategoryDto) {
  return categoryRepository.remove(categoryDto.categoryId);
}
