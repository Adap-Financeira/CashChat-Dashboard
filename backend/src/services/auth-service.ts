import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user-repository";
import * as permissionRepository from "../repositories/permission-repository";
import { CustomError } from "../utils/errors";
import bcrypt from "bcryptjs";

export async function login(email: string, password: string) {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Senha inválida.", 401);
    }

    //Check if user has permission to access the dashboard
    const permission = await permissionRepository.findByUserId(user._id.toString());
    if (!permission?.access) {
      throw new CustomError("Usuário sem acesso a plataforma dashboard.", 401);
    }

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return {
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
