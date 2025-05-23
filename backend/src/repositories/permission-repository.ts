import { PermissionDto } from "../dto/permission";
import Permission from "../models/Permission";

export async function findByUserId(userId: string) {
  return await Permission.findOne({ userId });
}

export async function create(permission: {
  userId: string;
  productId: string;
  phoneNumber: string;
  access: boolean;
  expiresAt?: Date;
}) {
  return await Permission.create(permission);
}

export async function findByUserIdAndProductId(userId: string, productId: string) {
  return await Permission.findOne({ userId, productId });
}

export async function update(permission: any, id: string) {
  return await Permission.findByIdAndUpdate(id, permission, { new: true });
}

export async function findUniqueByUserIdAndProductId(userId: string, productId: string) {
  return await Permission.findOne({ userId, productId });
}

export async function create(permission: PermissionDto) {
  return await Permission.create(permission);
}

