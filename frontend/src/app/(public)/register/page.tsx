"use client";
import InputPassword from "@/components/input-password/InputPassword";
import InputText from "@/components/input-text/InputText";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { registerSchema } from "@/schemas/schemas";
import { FirebaseError } from "firebase/app";

interface FormErrors {
  email: string | undefined;
  password: string | undefined;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: undefined,
    password: undefined,
  });
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setPending(true);
      const result = registerSchema.safeParse({
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
      const response = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Esse email já foi cadastrado.");
          setPending(false);
          return;
        }
      }
      toast.error("Erro ao realizar cadastro");
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

        <div className="flex flex-col justify-center max-w-[320px] w-full py-10 m-auto">
          <div className="flex flex-col max-w-[120px]">
            {/* <img src="/Logo.png" alt="Logo" /> */}
            <h1>LOGO</h1>
          </div>

          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
              <div className="flex flex-col gap-[12px]">
                <h2 className="text-lg font-bold">Crie sua conta!</h2>
                <div>
                  <p className="text-md">Encontre parceiros para treinar ao ar livre.</p>
                  <p className="text-md">Conecte-se e comece agora! 💪</p>
                </div>
              </div>

              <div className="flex flex-col gap-[16px] mt-6">
                <InputText
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Ex.: email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={formErrors.email}
                />

                <InputPassword
                  label="Senha"
                  id="password"
                  name="password"
                  placeholder="Ex.: 123546"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formErrors.password}
                />
              </div>

              <Button className="w-full h-[48px] cursor-pointer mt-6" disabled={pending}>
                Cadastrar
              </Button>
            </form>

            <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground">
              <p>Já tem uma conta?</p>
              <Link href="/login" className="font-bold text-primary">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
