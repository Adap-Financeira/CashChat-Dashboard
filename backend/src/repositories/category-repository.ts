import mongoose from "mongoose";
import Category from "../models/Category";
import { CreateCategory, UpdateCategory } from "../types/Category";

export async function getAll(userId: string) {
  return await Category.find({ userId });
}

export async function getByName(name: string, userId: string) {
  return await Category.findOne({ name, userId });
}

export async function getById(categoryId: string, userId: string) {
  return await Category.findOne({ _id: categoryId, userId });
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

export async function removeOneWithSession(categoryId: string, session: mongoose.ClientSession) {
  console.log(categoryId);
  return await Category.deleteOne({ _id: categoryId }).session(session);
}
