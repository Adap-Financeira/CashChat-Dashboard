import { PermissionDto } from "../dto/permission";
import * as permissionRepository from "../repositories/permission-repository";
import { CustomError } from "../utils/errors";

export async function createPermission(permission: PermissionDto) {
  try {
    const permissionExists = await permissionRepository.findUniqueByUserIdAndProductId(
      permission.userId,
      permission.productId
    );
    if (permissionExists) {
      throw new CustomError("Permission already exists", 400);
    }

    return await permissionRepository.create(permission);
  } catch (error) {
    throw error;
  }
}
