"use server";
import { getRequiredCookie } from "@/app/actions";

export async function getPaymentMethods(): Promise<
  {
    _id: string;
    type: string;
  }[]
> {
  try {
    const token = await getRequiredCookie();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token};`,
      },
      credentials: "include",
      next: {
        tags: ["payment-methods"],
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}
