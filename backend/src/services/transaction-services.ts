import { TransactionDto } from "../dto/transaction";
import * as transactionRepository from "../repositories/transaction-repository";

export async function createTransaction(transaction: TransactionDto) {
  try {
    await transactionRepository.create(transaction);
  } catch (error) {
    throw error;
  }
}

export async function getAllTransactions() {
  try {
    const transactions = await transactionRepository.getAll();

    return transactions;
  } catch (error) {
    throw error;
  }
}
