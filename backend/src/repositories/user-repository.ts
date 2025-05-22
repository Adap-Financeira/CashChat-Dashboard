import { CreateUserDto } from "../dto/user";
import User from "../models/User";
import { IUser } from "../types/User";

export async function create(user: CreateUserDto) {
  await User.create(user);
}

export async function findByEmail(email: string) {
  return await User.findOne({ email });
}

export async function findById(id: string) {
  return await User.findById(id);
}

export async function update(user: IUser, id: string) {
  return await User.findByIdAndUpdate(id, user);
}
