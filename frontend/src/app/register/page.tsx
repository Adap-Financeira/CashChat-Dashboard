"use client";
import InputPassword from "@/components/input-password/InputPassword";
import InputText from "@/components/input-text/InputText";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { register } from "../actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = {
  error: {
    email: undefined,
    password: undefined,
    phone: undefined,
    name: undefined,
  },
  message: undefined,
};

export default function Register() {
  const [state, formAction] = useActionState(register, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
      setTimeout(() => {
        router.push("/login");
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

        <ScrollArea className="md:w-1/2 h-full">
          <div className="flex flex-col justify-center max-w-[320px] w-full py-10 m-auto">
            <div className="flex flex-col max-w-[120px]">
              {/* <img src="/Logo.png" alt="Logo" /> */}
              <h1>LOGO</h1>
            </div>

            <div className="flex flex-col">
              <form action={formAction} className="flex flex-col justify-center">
                <div className="flex flex-col gap-[12px]">
                  <h2 className="text-lg font-bold">Crie sua conta!</h2>
                  <div>
                    <p className="text-md">Encontre parceiros para treinar ao ar livre.</p>
                    <p className="text-md">Conecte-se e comece agora! 💪</p>
                  </div>
                </div>

                <div className="flex flex-col gap-[16px] mt-6">
                  <InputText
                    label="Nome completo"
                    id="name"
                    name="name"
                    placeholder="Ex.: Guilherme Silva"
                    error={state.error?.name}
                  />

                  <InputText
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="Ex.: email@email.com"
                    error={state.error?.email}
                  />

                  <InputText
                    label="Número de telefone"
                    id="phone"
                    name="phone"
                    placeholder="Ex.: (11) 99999-9999"
                    error={state.error?.phone}
                    // ADD MASK FOR PHONE NUMBER AND VALIDATIONS AS WELL
                  />

                  <InputPassword
                    label="Senha"
                    id="password"
                    name="password"
                    placeholder="Ex.: 123546"
                    error={state.error?.password}
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
        </ScrollArea>
      </div>
    </div>
  );
}
