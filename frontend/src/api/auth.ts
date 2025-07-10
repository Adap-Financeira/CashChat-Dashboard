"use server";
import { RegisterSchemaType } from "@/schemas/schemas";
import { CustomError } from "@/utils/custom-error";

export async function register(data: RegisterSchemaType) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, phoneNumber: `55${data.phoneNumber}` }),
      cache: "no-store",
    });

    const result = await response.json();

    if (response.status !== 200) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message };
  } catch (error: any) {
    throw error;
  }
}
