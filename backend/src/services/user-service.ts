import * as userRepository from "../repositories/user-repository";
import { CustomError } from "../utils/errors";
import { CreateUserDto } from "../dto/user";

export async function createUser(user: CreateUserDto) {
  try {
    const userExists = await userRepository.findByEmail(user.email);
    if (userExists) {
      throw new CustomError("User already exists", 400);
    }

    return await userRepository.create(user);
  } catch (error) {
    throw error;
  }
}
