"use server";
import { getRequiredCookie } from "@/app/actions";
import { MonthlyReport } from "@/types/reports";

export async function getYearlySummary(year: string) {
  try {
    const token = await getRequiredCookie();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reports/monthly-reports?year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token};`,
        },
        credentials: "include",
        next: {
          tags: ["reports"],
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data as MonthlyReport[];
  } catch (error: any) {
    throw error;
  }
}
