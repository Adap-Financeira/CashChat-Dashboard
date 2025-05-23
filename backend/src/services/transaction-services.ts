import { TransactionDto } from "../dto/transaction";
import * as transactionRepository from "../repositories/transaction-repository";

export async function createTransaction(transaction: TransactionDto) {
  try {
    await transactionRepository.create(transaction);
  } catch (error) {
    throw error;
  }
}
