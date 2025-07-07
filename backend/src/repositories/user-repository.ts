import mongoose from "mongoose";
import User from "../models/User";
import { CreateUser, UpdateUser } from "../types/User";

export async function getAll() {
  return await User.find().lean();
}

export async function create(user: CreateUser, session?: mongoose.ClientSession) {
  if (session) {
    return (await User.create([user], { session }))[0];
  }
  return await User.create(user);
}

export async function findByEmail(email: string) {
  return await User.findOne({ email }).lean();
}

export async function findByPhoneNumber(phoneNumber: string) {
  return await User.findOne({ phoneNumber }).lean();
}

export async function findById(id: string) {
  return await User.findById(id).lean();
}

export async function update(email: string, data: UpdateUser) {
  return await User.findOneAndUpdate({ email }, data);
}

export async function updateById(id: string, data: UpdateUser, session?: mongoose.ClientSession) {
  if (session) {
    return await User.findByIdAndUpdate(id, data, { session });
  }
  return await User.findByIdAndUpdate(id, data);
}

export async function setFirebaseId(email: string, firebaseId: string) {
  return await User.findOneAndUpdate({ email }, { firebaseId });
}
