import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user-repository";
import { CustomError } from "../utils/errors";
import bcrypt from "bcryptjs";

export async function login(email: string, password: string) {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid password", 401);
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    console.log(token);

    return {
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
