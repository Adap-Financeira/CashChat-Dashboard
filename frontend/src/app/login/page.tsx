"use client";
import InputPassword from "@/components/input-password/InputPassword";
import InputText from "@/components/input-text/InputText";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/app/actions";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = {
  error: {
    email: undefined,
    password: undefined,
  },
};

export default function Login() {
  const [state, formAction] = useActionState(login, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [state.message]);

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
              <form action={formAction} className="flex flex-col justify-center">
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
                    error={state.error?.email}
                  />

                  <InputPassword
                    label="Senha"
                    id="password"
                    name="password"
                    placeholder="Ex.: 123546"
                    error={state.error?.password}
                  />
                </div>

                <Button className="w-full h-[48px] cursor-pointer mt-5" disabled={pending}>
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
