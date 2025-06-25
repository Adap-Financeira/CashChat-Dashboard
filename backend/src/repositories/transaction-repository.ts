import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import { CreateTransaction, ITransaction, UpdateTransaction } from "../types/Transaction";

export async function create(transaction: CreateTransaction) {
  await Transaction.create(transaction);
}

export async function update(transactionId: string, transaction: UpdateTransaction) {
  await Transaction.updateOne({ _id: transactionId }, transaction);
}

export async function remove(transactionId: string) {
  return await Transaction.deleteOne({ _id: transactionId });
}

export async function removeOneWithSession(transactionId: string, session: mongoose.ClientSession) {
  return await Transaction.deleteOne({ _id: transactionId }).session(session);
}

export async function removeManyByInstallmentGroupId(transactionGroupId: string, session: mongoose.ClientSession) {
  return await Transaction.deleteMany({ installmentsGroupId: transactionGroupId }).session(session);
}

export async function removeManyByCategoryId(categoryId: string, session: mongoose.ClientSession) {
  return await Transaction.deleteMany({ categoryId }).session(session);
}

export async function findById(transactionId: string) {
  return await Transaction.findById(transactionId);
}

export async function getAll(userId: string) {
  return await Transaction.find({ userId })
    .populate("categoryId", "name")
    .populate("paymentMethodId", "type")
    .lean<ITransaction[]>();
}

export async function getAllByDateRange(startDate: Date, endDate: Date, userId: string) {
  return await Transaction.find({
    userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .populate("categoryId", "name")
    .populate("paymentMethodId", "type")
    .lean<ITransaction[]>();
}
