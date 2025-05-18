"use server";

import { loginSchema, registerSchema } from "@/schemas/schemas";
import { LoginFormState, RegisterFormState } from "@/types/auth-form";

export async function login(formState: LoginFormState, formData: FormData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    return {
      message: "Login realizado com sucesso!",
    };
  } catch (error) {
    return {
      message: "Erro ao realizar login",
    };
  }
}

export async function register(formState: RegisterFormState, formData: FormData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
