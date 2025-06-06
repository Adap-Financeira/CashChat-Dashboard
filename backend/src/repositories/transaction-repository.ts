import Transaction from "../models/Transaction";
import { CreateInstallmentTransaction, CreateTransaction } from "../types/Transaction";

export async function create(transaction: CreateTransaction | CreateInstallmentTransaction) {
  await Transaction.create(transaction);
}

export async function getAll() {
  return await Transaction.find();
}

export async function getAllByDateRange(startDate: Date, endDate: Date) {
  return await Transaction.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
}
