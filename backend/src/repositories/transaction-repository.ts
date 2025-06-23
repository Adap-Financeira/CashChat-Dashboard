import Transaction from "../models/Transaction";
import { CreateTransaction, ITransaction, UpdateTransaction } from "../types/Transaction";

export async function create(transaction: CreateTransaction) {
  await Transaction.create(transaction);
}

export async function update(transactionId: string, transaction: UpdateTransaction) {
  await Transaction.updateOne({ _id: transactionId }, transaction);
}

export async function remove(transactionId: string) {
  await Transaction.deleteOne({ _id: transactionId });
}

export async function removeMany(transactionGroupId: string) {
  await Transaction.deleteMany({ installmentsGroupId: transactionGroupId });
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
