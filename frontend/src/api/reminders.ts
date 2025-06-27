"use server";
import { getCookie } from "@/app/actions";
import { CustomError } from "@/utils/custom-error";
import { revalidateTag } from "next/cache";

export async function getReminders(limit?: number) {
  try {
    const reminders = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reminders/all${limit ? `?limit=${limit}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${await getCookie("token")};`,
        },
        credentials: "include",
        next: {
          tags: ["reminders"],
        },
      }
    );
    const data = await reminders.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function createReminder(
  description: string,
  date: Date
): Promise<{ message: string } | CustomError> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reminders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${await getCookie("token")};`,
      },
      body: JSON.stringify({ description, date }),
      cache: "no-store",
      credentials: "include",
    });
    revalidateTag("reminders");
    const data = await response.json();

    if (!response.ok) {
      throw new CustomError(data.error, response.status);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateReminder(
  description: string,
  date: Date,
  reminderId: string
): Promise<{ message: string } | CustomError> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reminders/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${await getCookie("token")};`,
      },
      body: JSON.stringify({ description, date, reminderId }),
      cache: "no-store",
      credentials: "include",
    });
    revalidateTag("reminders");
    const data = await response.json();

    if (!response.ok) {
      throw new CustomError(data.error, response.status);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteReminder(reminderId: string): Promise<{ message: string } | CustomError> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reminders/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${await getCookie("token")};`,
      },
      body: JSON.stringify({ reminderId }),
      cache: "no-store",
      credentials: "include",
    });
    revalidateTag("reminders");
    const data = await response.json();

    if (!response.ok) {
      throw new CustomError(data.error, response.status);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
