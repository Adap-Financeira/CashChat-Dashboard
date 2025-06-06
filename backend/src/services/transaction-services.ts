import { TransactionDto, TransactionInstallmentsDto } from "../dto/transaction";
import * as transactionRepository from "../repositories/transaction-repository";
import { CreateInstallmentTransaction, CreateTransaction } from "../types/Transaction";

export async function createTransaction(transactionDto: TransactionDto) {
  const transaction: CreateTransaction = {
    ...transactionDto,
    date: new Date(),
  };
  try {
    await transactionRepository.create(transaction);
  } catch (error) {
    throw error;
  }
}

export async function createTransactionInstallments(transactionDto: TransactionInstallmentsDto) {
  try {
    const installmentAmount = transactionDto.amount / transactionDto.installmentsCount;
    const installmentGroupId = Math.random().toString(36).substring(2, 10);
    const date = new Date();

    for (let i = 1; i <= transactionDto.installmentsCount; i++) {
      const installment: CreateInstallmentTransaction = {
        ...transactionDto,
        amount: installmentAmount,
        installmentsCurrent: i,
        installmentsGroupId: installmentGroupId,
        date,
      };

      await transactionRepository.create(installment);
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllTransactions(startDate?: Date, endDate?: Date) {
  try {
    if (startDate && endDate) {
      return await transactionRepository.getAllByDateRange(startDate, endDate);
    }

    const transactions = await transactionRepository.getAll();
    return transactions;
  } catch (error) {
    throw error;
  }
}
