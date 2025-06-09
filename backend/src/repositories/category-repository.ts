import Category from "../models/Category";
import { CreateCategory, UpdateCategory } from "../types/Category";

export async function getAll(userId: string) {
  return await Category.find({ userId });
}

export async function getByName(name: string) {
  return await Category.findOne({ name });
}

export async function getById(categoryId: string) {
  return await Category.findById(categoryId);
}

export async function create(category: CreateCategory) {
  return await Category.create(category);
}

export async function update(categoryId: string, category: UpdateCategory) {
  return await Category.updateOne({ _id: categoryId }, category);
}

export async function remove(categoryId: string) {
  console.log(categoryId);
  return await Category.deleteOne({ _id: categoryId });
}
