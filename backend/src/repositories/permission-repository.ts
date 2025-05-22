import { PermissionDto } from "../dto/permission";
import Permission from "../models/Permission";

export async function findByUserId(userId: string) {
  return await Permission.findOne({ userId });
}

export async function findUniqueByUserIdAndProductId(userId: string, productId: string) {
  return await Permission.findOne({ userId, productId });
}

export async function create(permission: PermissionDto) {
  return await Permission.create(permission);
}

