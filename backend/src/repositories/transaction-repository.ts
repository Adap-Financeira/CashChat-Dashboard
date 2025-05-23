import { TransactionDto } from "../dto/transaction";
import Transaction from "../models/Transaction";

export async function create(transaction: TransactionDto) {
  await Transaction.create(transaction);
}
