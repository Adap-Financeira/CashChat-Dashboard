"use server";

import { cookies } from "next/headers";

export async function setCookie(value: string, name?: string) {
  (await cookies()).set({
    name: name ?? "token",
    value: value,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour
  });
}

export async function removeCookie(name: string) {
  (await cookies()).delete(name);
}

export async function getCookie(name: string) {
  return (await cookies()).get(name)?.value;
}

/**
 * Retrieves a required cookie and throws an error if it's not found.
 * @returns The cookie value.
 */
export async function getRequiredCookie() {
  const token = await getCookie("token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return token;
}
