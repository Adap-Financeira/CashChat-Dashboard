"use server";

import { loginSchema, registerSchema } from "@/schemas/schemas";
import { LoginFormState, RegisterFormState } from "@/types/auth-form";
import { getCookie } from "@/utils/get-cookie";
import { cookies } from "next/headers";

export async function login(formState: LoginFormState, formData: FormData) {
  try {
    const result = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      return {
        error: {
          email: flat.email?.[0],
          password: flat.password?.[0],
        },
      };
    }

    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log("should not run");

    const rawCookie = response.headers.get("set-cookie");

    if (!rawCookie) {
      throw new Error("Erro ao realizar login.");
    }

    const value = getCookie(rawCookie);

    if (!value) {
      throw new Error("Erro ao realizar login.");
    }

    (await cookies()).set({
      name: "token",
      value,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      message: "Login realizado com sucesso!",
    };
  } catch (error: any) {
    console.log("state should update");
    return {
      message: error.message,
    };
  }
}

export async function register(formState: RegisterFormState, formData: FormData) {
  try {
    const result = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    });

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      return {
        error: {
          email: flat.email?.[0],
          password: flat.password?.[0],
          phone: flat.phone?.[0],
          name: flat.name?.[0],
        },
      };
    }

    return {
      message: "Cadastro realizado com sucesso!",
    };
  } catch (error) {
    return {
      message: "Erro ao realizar cadastro",
    };
  }
}
