import * as categoryRepository from "../repositories/category-repository";
import * as colorsRepository from "../repositories/colors-repository";
import { CustomError } from "../utils/errors";
import { findUserByEmail } from "./user-service";
import { CreateCategoryType, RemoveCategoryType, UpdateCategoryType } from "../schemas/categories-schema";
import { deleteManyTransactionsByCategory } from "./transaction-services";
import mongoose from "mongoose";

export async function getAllCategories(email: string) {
  try {
    const user = await findUserByEmail(email);

    return categoryRepository.getAll(user._id.toString());
  } catch (error) {
    throw error;
  }
}

export async function getCategoryByName(email: string, name: string) {
  try {
    const user = await findUserByEmail(email);

    return categoryRepository.getByName(name.toLowerCase(), user._id.toString());
  } catch (error) {
    throw error;
  }
}

export async function createCategoryWithEmail(email: string, data: CreateCategoryType) {
  try {
    const user = await findUserByEmail(email);

    // Check if category already exists
    const categoryExists = await categoryRepository.getByName(data.name.toLowerCase(), user._id.toString());

    if (categoryExists) {
      throw new CustomError("Essa categoria já existe.", 400);
    }

    // Check if colors exists
    const colorsExists = await colorsRepository.getByValue(data.color);

    if (!colorsExists) {
      throw new CustomError("Essa cor não foi encontrada ou não esta disponivel no momento.", 404);
    }

    return categoryRepository.create({
      ...data,
      name: data.name.toLowerCase(),
      userId: user._id.toString(),
    });
  } catch (error) {
    throw error;
  }
}

export async function updateCategory(email: string, data: UpdateCategoryType) {
  try {
    // get the user
    const user = await findUserByEmail(email);

    // Check if category exists by id
    const categoryExists = await categoryRepository.getById(data.categoryId, user._id.toString());

    if (!categoryExists) {
      throw new CustomError("Categoria não encontrada.", 404);
    }

    // Check if other category has its name
    if (data.name) {
      const categoryExistsByName = await categoryRepository.getByName(
        data.name.toLowerCase(),
        user._id.toString()
      );

      if (categoryExistsByName && data.categoryId !== categoryExistsByName._id.toString()) {
        throw new CustomError("Essa categoria já existe.", 400);
      }
    }

    // Check if colors exists
    const colorsExists = data.color ? await colorsRepository.getByValue(data.color) : null;

    if (!colorsExists) {
      throw new CustomError("Essa cor não foi encontrada ou não esta disponivel no momento.", 404);
    }

    return categoryRepository.update(data.categoryId, data);
  } catch (error) {
    throw error;
  }
}

export async function removeCategory(email: string, data: RemoveCategoryType) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await findUserByEmail(email);

    // Check if category exists by id
    const categoryExists = await categoryRepository.getById(data.categoryId, user._id.toString());

    if (!categoryExists) {
      throw new CustomError("Categoria não encontrada.", 404);
    }

    await deleteManyTransactionsByCategory(data.categoryId, session);

    await categoryRepository.removeOneWithSession(data.categoryId, session);

    await session.commitTransaction();
    session.endSession();
    return { success: true };
  } catch (error) {
    console.log(error);

    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
