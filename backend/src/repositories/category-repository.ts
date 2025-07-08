import mongoose from "mongoose";
import Category from "../models/Category";
import { CreateCategory, UpdateCategory } from "../types/Category";

export async function getAll(userId: string) {
  return await Category.find({ userId });
}

export async function getByName(name: string, userId: string) {
  return await Category.findOne({ name, userId });
}

export async function getManyByNames(names: string[], userId: string) {
  return await Category.find({ name: { $in: names }, userId });
}

export async function getById(categoryId: string, userId: string) {
  return await Category.findOne({ _id: categoryId, userId });
}

export async function create(category: CreateCategory, session?: mongoose.ClientSession) {
  if (session) {
    return (await Category.create([category], { session }))[0];
  }
  return await Category.create(category);
}

export async function createMany(categories: CreateCategory[], session?: mongoose.ClientSession) {
  // Define options object. If a session exists, add it with ordered: true
  const options = session ? { session, ordered: true } : {};

  // One single, clean call to create.
  // Mongoose is smart enough to use insertMany here.
  return await Category.create(categories, options);
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
