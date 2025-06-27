import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user-repository";
import * as permissionRepository from "../repositories/permission-repository";
import { CustomError } from "../utils/errors";
import bcrypt from "bcryptjs";
import { productsIds } from "../utils/products";

export async function login(email: string) {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("Usuário não encontrado.", 404);
    }

    //Check if user has permission to access the dashboard
    const permission = await permissionRepository.findByUserIdAndProductId(
      user._id.toString(),
      productsIds.Dashboard
    );
    if (!permission?.access) {
      throw new CustomError("Usuário sem acesso a plataforma dashboard.", 401);
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return {
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
