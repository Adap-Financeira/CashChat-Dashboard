"use server";

export async function validateTransaction(id: string, email: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotmart/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email }),
      cache: "no-store",
    });

    const result = await response.json();

    console.log("result", result);

    if (response.status !== 200) {
      return { success: false, message: result.error };
    }

    return { success: true, message: result.message };
  } catch (error: any) {
    throw error;
  }
}
