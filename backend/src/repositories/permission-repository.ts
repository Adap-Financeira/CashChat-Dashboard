import mongoose from "mongoose";
import { PermissionDto } from "../dto/permission";
import Permission from "../models/Permission";

export async function findByUserId(userId: string) {
  return await Permission.findOne({ userId });
}

/**
 * Create a new permission
 * @param permission Permission data to create
 * @returns The created permission
 */
export async function create(permission: PermissionDto, session?: mongoose.ClientSession) {
  if (session) {
    return (await Permission.create([permission], { session }))[0];
  }
  return await Permission.create(permission);
}

/**
 * Find a permission by user ID and product ID
 * @param userId User ID
 * @param productId Product ID
 * @returns The permission if found, null otherwise
 */
export async function findByUserIdAndProductId(userId: string, productId: string) {
  return await Permission.findOne({ userId, productId });
}

/**
 * Update a permission
 * @param permission Permission data to update
 * @param id Permission ID
 * @returns The updated permission
 */
export async function update(permission: any, id: string, session?: mongoose.ClientSession) {
  if (session) {
    return await Permission.findByIdAndUpdate(id, permission, { new: true, session });
  }
  return await Permission.findByIdAndUpdate(id, permission, { new: true });
}
