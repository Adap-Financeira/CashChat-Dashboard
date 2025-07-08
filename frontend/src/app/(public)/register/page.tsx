"use client";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { registerSchema, RegisterSchemaType } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "@/components/form-components/FormTextInput";
import { Form } from "@/components/ui/form";
import FormPasswordInput from "@/components/form-components/FormPasswordInput";
import FormPhoneInput from "@/components/form-components/FormPhoneInput";
import { register } from "@/api/auth";
import { CustomError } from "@/utils/custom-error";

export default function Register() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterSchemaType) {
    try {
      const response = await register(data);

      toast.success(response.message);
      router.push("/login");
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message);
      }

      toast.error("Erro ao realizar cadastro");
    }
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">
                <div className="flex flex-col gap-[12px]">
                  <h2 className="text-lg font-bold">Crie sua conta!</h2>
                  <div>
                    <p className="text-md">Encontre parceiros para treinar ao ar livre.</p>
                    <p className="text-md">Conecte-se e comece agora! 💪</p>
                  </div>
                </div>

                <div className="flex flex-col gap-[16px] mt-6">
                  <FormTextInput
                    control={form.control}
                    name="name"
                    label="Nome"
                    placeholder="Ex.: João Silva"
                  />

                  <FormTextInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Ex.: email@email.com"
                  />

                  <FormPhoneInput
                    control={form.control}
                    name="phoneNumber"
                    label="Telefone"
                    placeholder="Ex.: (11) 99999-9999"
                  />
                  <FormPasswordInput
                    control={form.control}
                    name="password"
                    label="Senha"
                    placeholder="Ex.: 123546"
                  />
                </div>

                <Button className="w-full h-[48px] cursor-pointer mt-6" disabled={pending}>
                  Cadastrar
                </Button>
              </form>
            </Form>

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
