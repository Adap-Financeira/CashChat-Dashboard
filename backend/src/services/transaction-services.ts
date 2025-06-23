import * as transactionRepository from "../repositories/transaction-repository";
import { CreateTransaction } from "../types/Transaction";
import { CreateTransactionType, UpdateTransactionType } from "../schemas/transaction-schemas";
import { nanoid } from "nanoid";
import { findUserByEmail } from "../services/user-service";
import { CustomError } from "../utils/errors";

export async function createTransaction(email: string, data: CreateTransactionType) {
  try {
    const user = await findUserByEmail(email);
    const transaction: CreateTransaction = {
      ...data,
      userId: user._id.toString(),
      messageId: data.messageId || nanoid(8),
      date: new Date(data.date),
    };
    await transactionRepository.create(transaction);
  } catch (error) {
    throw error;
  }
}

export async function createTransactionInstallments(email: string, data: CreateTransactionType) {
  try {
    const user = await findUserByEmail(email);
    const installmentAmount = data.amount / data.installmentsCount!;
    const installmentGroupId = nanoid();

    for (let i = 1; i <= data.installmentsCount!; i++) {
      const installmentDate = new Date(data.date);
      installmentDate.setDate(installmentDate.getDate() + (i - 1) * 30);

      const installment: CreateTransaction = {
        ...data,
        description: `${data.description} - ${i}/${data.installmentsCount}`,
        userId: user._id.toString(),
        amount: installmentAmount,
        installmentsCurrent: i,
        installmentsGroupId: installmentGroupId,
        date: installmentDate,
        messageId: data.messageId || nanoid(8),
      };

      await transactionRepository.create(installment);
    }
  } catch (error) {
    throw error;
  }
}

export async function updateTransaction(email: string, { transactionId, data }: UpdateTransactionType) {
  try {
    const user = await findUserByEmail(email);
    const transaction = await transactionRepository.findById(transactionId);
    if (!transaction) {
      throw new CustomError("Transação não encontrada", 404);
    }
    if (transaction.userId !== user._id.toString()) {
      throw new CustomError("Você não tem permissão para realizar essa ação", 403);
    }

    await transactionRepository.update(transactionId, { ...data, date: new Date(data.date) });
  } catch (error) {
    throw error;
  }
}

export async function deleteTransaction(email: string, transactionId: string) {
  try {
    const user = await findUserByEmail(email);
    const transaction = await transactionRepository.findById(transactionId);
    if (!transaction) {
      throw new CustomError("Transação não encontrada", 404);
    }
    if (transaction.userId !== user._id.toString()) {
      throw new CustomError("Você não tem permissão para realizar essa ação", 403);
    }

    // Check if the transaction is an installment, then delete all installments
    if (transaction.installmentsGroupId) {
      await transactionRepository.removeMany(transaction.installmentsGroupId);
    }

    await transactionRepository.remove(transactionId);
  } catch (error) {
    throw error;
  }
}

export async function getAllTransactions(email: string, startDate?: Date, endDate?: Date) {
  try {
    const user = await findUserByEmail(email);
    if (startDate && endDate) {
      const data = await transactionRepository.getAllByDateRange(startDate, endDate, user._id.toString());

      const transactions = data.map((transaction) => {
        const { categoryId, paymentMethodId, ...rest } = transaction; // Removing categoryId from return
        return {
          ...rest,
          category: categoryId ? categoryId.name : "",
          paymentMethod: paymentMethodId ? paymentMethodId.type : "",
        };
      });

      return transactions;
    }

    const data = await transactionRepository.getAll(user._id.toString());
    const transactions = data.map((transaction) => {
      const { categoryId, paymentMethodId, ...rest } = transaction; // Removing categoryId from return
      return {
        ...rest,
        category: categoryId ? categoryId.name : "",
        paymentMethod: paymentMethodId ? paymentMethodId.type : "",
      };
    });

    return transactions;
  } catch (error) {
    throw error;
  }
}
