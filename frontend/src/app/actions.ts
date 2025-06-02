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
