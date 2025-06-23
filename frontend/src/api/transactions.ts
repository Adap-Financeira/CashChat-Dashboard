"use server";
import { getCookie } from "@/app/actions";
import { revalidateTag } from "next/cache";
import { CreateTransactionType, DeleteTransactionType, UpdateTransactionType } from "./types/transactions";

export async function getTransactions(from: string, to: string) {
  try {
    const token = await getCookie("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transaction/all?from=${from}&to=${to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token};`,
        },
        credentials: "include",
        next: {
          tags: ["transactions"],
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function createTransaction(transaction: CreateTransactionType) {
  try {
    const token = await getCookie("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token};`,
      },
      credentials: "include",
      body: JSON.stringify(transaction),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    revalidateTag("transactions");
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function updateTransaction(transaction: UpdateTransactionType) {
  try {
    const token = await getCookie("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transaction/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token};`,
      },
      credentials: "include",
      body: JSON.stringify(transaction),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    revalidateTag("transactions");
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteTransaction({ id }: DeleteTransactionType) {
  try {
    const token = await getCookie("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transaction/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token};`,
      },
      credentials: "include",
      body: JSON.stringify({ transactionId: id }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    revalidateTag("transactions");
    return data;
  } catch (error: any) {
    throw error;
  }
}
