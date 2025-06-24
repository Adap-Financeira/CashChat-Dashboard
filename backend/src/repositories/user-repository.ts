import User from "../models/User";
import { CreateUser, UpdateUser } from "../types/User";

export async function create(user: CreateUser) {
  await User.create(user);
}

export async function findByEmail(email: string) {
  return await User.findOne({ email }).lean();
}

export async function findById(id: string) {
  return await User.findById(id).lean();
}

export async function update(email: string, data: UpdateUser) {
  return await User.findOneAndUpdate({ email }, data);
}

export async function setFirebaseId(email: string, firebaseId: string) {
  return await User.findOneAndUpdate({ email }, { firebaseId });
}
