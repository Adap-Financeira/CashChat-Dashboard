import { getRequiredCookie } from "@/app/actions";

export async function getColors(): Promise<
  {
    id: string;
    name: string;
    value: string;
  }[]
> {
  try {
    const token = await getRequiredCookie();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colors/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token};`,
      },
      credentials: "include",
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
