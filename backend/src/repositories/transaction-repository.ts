import { TransactionDto } from "../dto/transaction";
import Transaction from "../models/Transaction";

export async function create(transaction: TransactionDto) {
  await Transaction.create(transaction);
}

export async function getAll() {
  return await Transaction.find();
}
