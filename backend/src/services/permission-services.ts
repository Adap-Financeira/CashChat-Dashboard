import mongoose from "mongoose";
import { PermissionDto } from "../dto/permission";
import * as permissionRepository from "../repositories/permission-repository";
import { CustomError } from "../utils/errors";
import { findUserByEmail } from "./user-service";

export async function createPermission(permission: PermissionDto, session?: mongoose.ClientSession) {
  try {
    const permissionExists = await permissionRepository.findByUserIdAndProductId(
      permission.userId,
      permission.productId
    );
    if (permissionExists) {
      throw new CustomError("Permissão já existe.", 400);
    }

    return await permissionRepository.create(permission, session);
  } catch (error) {
    throw error;
  }
}

export async function createOrUpdatePermission(permission: PermissionDto, session?: mongoose.ClientSession) {
  try {
    const permissionExists = await permissionRepository.findByUserIdAndProductId(
      permission.userId,
      permission.productId
    );
    if (permissionExists) {
      return await permissionRepository.update(permission, permissionExists._id.toString(), session);
    }

    return await permissionRepository.create(permission, session);
  } catch (error) {
    throw error;
  }
}

export async function findPermissionByUserIdAndProductId(userId: string, productId: string) {
  try {
    return await permissionRepository.findByUserIdAndProductId(userId, productId);
  } catch (error) {
    throw error;
  }
}

export async function checkUserPermission(email: string, productId: string) {
  try {
    const user = await findUserByEmail(email);

    const permission = await permissionRepository.findByUserIdAndProductId(user._id.toString(), productId);

    if (!permission) {
      throw new CustomError("Permissão não encontrada.", 404);
    }

    if (!permission.access) {
      throw new CustomError("Você não tem permissão para realizar essa ação.", 403);
    }

    if (permission.expiresAt && permission.expiresAt < new Date()) {
      throw new CustomError("Permissão expirada.", 403);
    }
    return permission;
  } catch (error) {
    throw error;
  }
}
