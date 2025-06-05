import * as userRepository from "../repositories/user-repository";
import { CustomError } from "../utils/errors";
import bcrypt from "bcryptjs";
import { CreateUserDto } from "../dto/user";
import { UpdateUser } from "../types/User";

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

// export async function setFirebaseId(email: string, firebaseId: string) {
//   try {
//     const userExists = await userRepository.findByEmail(email);
//     if (!userExists) {
//       throw new CustomError("User not found", 400);
//     }

//     return await userRepository.setFirebaseId(email, firebaseId);
//   } catch (error) {
//     throw error;
//   }
// }

export async function update(email: string, data: UpdateUser) {
  try {
    const userExists = await userRepository.findByEmail(email);
    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    const updatedUserData = {
      ...userExists.toObject(),
      ...data,
    };

    return await userRepository.update(updatedUserData, userExists._id.toString());
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(email: string, password: string) {
  try {
    const userExists = await userRepository.findByEmail(email);
    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    userExists.password = encryptedPassword;

    return await userRepository.update(userExists, userExists._id.toString());
  } catch (error) {
    throw error;
  }
}
