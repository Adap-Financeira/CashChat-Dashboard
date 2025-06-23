"use server";
import { getCookie } from "@/app/actions";
import { CustomError } from "@/utils/custom-error";
import { revalidateTag } from "next/cache";

export async function getCategories(): Promise<
  {
    _id: string;
    name: string;
    color: string;
  }[]
> {
  try {
    const token = await getCookie("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token};`,
      },
      credentials: "include",
      next: {
        tags: ["categories"],
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

export async function createCategory(
  name: string,
  color: string
): Promise<{ message: string } | CustomError> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${await getCookie("token")};`,
      },
      body: JSON.stringify({ name, color }),
      cache: "no-store",
      credentials: "include",
    });
    revalidateTag("categories");
    const data = await response.json();

    if (!response.ok) {
      throw new CustomError(data.error, response.status);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function updateCategory(
  name: string,
  color: string,
  categoryId: string
): Promise<{ message: string } | CustomError> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${await getCookie("token")};`,
      },
      body: JSON.stringify({ name, color, categoryId }),
      cache: "no-store",
      credentials: "include",
    });
    revalidateTag("categories");
    const data = await response.json();

    if (!response.ok) {
      throw new CustomError(data.error, response.status);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}
