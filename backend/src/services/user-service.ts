import * as userRepository from "../repositories/user-repository";
import { CustomError } from "../utils/errors";
import bcrypt from "bcryptjs";
import { UpdateUser } from "../types/User";
import { CreateUserType } from "../schemas/user-schema";
import mongoose from "mongoose";

export async function getAllUsers() {
  return await userRepository.getAll();
}

export async function checkEmailAvailability(email: string) {
  try {
    const user = await userRepository.findByEmail(email);

    if (user) {
      throw new CustomError("Um usuário já foi cadastrado com este email.", 400);
    }
  } catch (error) {
    throw error;
  }
}

export async function checkPhoneNumberAvailability(phoneNumber: string) {
  try {
    const user = await userRepository.findByPhoneNumber(phoneNumber);

    if (user) {
      throw new CustomError("Um usuário já foi cadastrado com este telefone.", 400);
    }
  } catch (error) {
    throw error;
  }
}

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

export async function findUserByPhoneNumber(phoneNumber: string) {
  try {
    const user = await userRepository.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export async function createUser(data: CreateUserType, session?: mongoose.ClientSession) {
  try {
    return await userRepository.create(data, session);
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
