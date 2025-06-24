import * as userRepository from "../repositories/user-repository";
import { CustomError } from "../utils/errors";
import bcrypt from "bcryptjs";
import { UpdateUser } from "../types/User";
import { CreateUserType } from "../schemas/user-schema";

export async function findUserByEmail(email: string) {
  try {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export async function createUser(data: CreateUserType) {
  try {
    const user = await findUserByEmail(data.email);
    if (user) {
      throw new CustomError("Usuário já existe.", 400);
    }

    return await userRepository.create(data);
  } catch (error) {
    throw error;
  }
}

export async function update(email: string, data: UpdateUser) {
  try {
    // Check if the user exists
   await findUserByEmail(email);
    
    return await userRepository.update(email, data);
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(email: string, password: string) {
  try {
    // Check if the user exists
    await findUserByEmail(email);

    const encryptedPassword = await bcrypt.hash(password, 10);

    return await userRepository.update(email, { password: encryptedPassword });
  } catch (error) {
    throw error;
  }
}
