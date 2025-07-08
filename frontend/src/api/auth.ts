"use server";
import { RegisterSchemaType } from "@/schemas/schemas";

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
    return result;
  } catch (error) {
    throw error;
  }
}
