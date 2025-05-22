import User from "../models/User";
import { User as UserType } from "../types/User";

export async function create(user: UserType) {
  User.create(user);
}

export async function findByEmail(email: string) {
  return await User.findOne({ email });
}

export async function findById(id: string) {
  return await User.findById(id);
}

export async function update(user: UserType, id: string) {
  return await User.findByIdAndUpdate(id, user);
}
