import Permission from "../models/Permission";

export async function findByUserId(userId: string) {
  return await Permission.findOne({ userId });
}
