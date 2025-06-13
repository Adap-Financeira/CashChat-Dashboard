"use client";
import InputPassword from "@/components/inputs/InputPassword";
import InputText from "@/components/inputs/InputText";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

interface FormErrors {
  email: string | undefined;
  password: string | undefined;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: undefined,
    password: undefined,
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = loginSchema.safeParse({
        email,
        password,
      });

      if (!result.success) {
        const flat = result.error.flatten().fieldErrors;
        setFormErrors({
          email: flat.email?.[0],
          password: flat.password?.[0],
        });
        setPending(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login-dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
      });

      const data = await response.json();

      if (response.status !== 200) {
        toast.error(data.error);
        setPending(false);
        return;
      }

      await login(email, password);
      toast.success("Login realizado com sucesso.");

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          toast.error("Email ou senha incorretos.");
          setPending(false);
          return;
        }
      }
      toast.error("Erro ao realizar login");
    }

    setPending(false);
  }

  return (
    <div className="flex items-center justify-center relative">
      <ThemeButton className="absolute top-4 right-4" />
      <div className="flex items-center justify-center max-w-[1440px] w-full h-screen">
        <div className="hidden w-1/2 h-full overflow-hidden md:flex">
          {/* <img
            src="/login.png"
            alt="Imagem de login"
            className="w-full h-full object-fit rounded-[12px]"
          /> */}
          <div className="w-full h-full bg-radial from-[#ffffff]/10 to-[#000000]"></div>
        </div>

        <div className="flex flex-col items-center md:w-1/2 h-full justify-center">
          <div className="flex flex-col justify-center max-w-[320px] w-full">
            <div className="flex flex-col max-w-[120px] mb-3">
              {/* <img src="/Logo.png" alt="Logo" /> */}
              <h1>LOGO</h1>
            </div>

            <div className="flex flex-col">
              <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex flex-col gap-[12px] mb-5">
                  <h2 className="text-lg font-bold">Bem-vindo de volta!</h2>
                  <div>
                    <p className="text-md">Encontre parceiros para treinar ao ar livre.</p>
                    <p className="text-md">Conecte-se e comece agora! 💪</p>
                  </div>
                </div>

                <div className="flex flex-col gap-[16px]">
                  <InputText
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="Ex.: email@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={formErrors.email}
                  />

                  <div>
                    <InputPassword
                      label="Senha"
                      id="password"
                      name="password"
                      placeholder="Ex.: 123546"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={formErrors.password}
                    />
                    <div className="mt-[-10px]">
                      <Link href="/reset-password" className="text-sm text-muted-foreground">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-[48px] cursor-pointer mt-5 disabled:opacity-50"
                  disabled={pending}
                >
                  Entrar
                </Button>
              </form>

              <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground">
                <p>Ainda não tem uma conta?</p>
                <Link href="/register" className="font-bold text-primary">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
