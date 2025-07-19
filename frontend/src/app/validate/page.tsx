"use client";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "@/components/logo/Logo";
import StepBackButton from "@/components/StepBackButton";
import FormTextInput from "@/components/form-components/FormTextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateSchema, ValidateType } from "@/schemas/schemas";
import { Form } from "@/components/ui/form";
import { validateTransaction } from "@/api/hotmart";

export default function ValidatePage() {
  const [pending, setPending] = useState(false);

  const form = useForm<ValidateType>({
    resolver: zodResolver(validateSchema),
    defaultValues: {
      id: "",
      email: "",
    },
  });

  async function onSubmit(data: ValidateType) {
    setPending(true);
    try {
      const response = await validateTransaction(data.id, data.email);
      toast.success(response.message);
    } catch (error) {
      toast.error("Erro ao validar o código informado.");
    }
    setPending(false);
  }

  return (
    <div className="flex items-center justify-center relative">
      <ThemeButton className="absolute top-4 right-4" />
      <div className="flex items-center justify-center max-w-[1440px] w-full h-screen">
        <div className="hidden w-1/2 h-full overflow-hidden md:flex">
          <div className="w-full h-full bg-radial from-[#ffffff]/10 to-[#000000]"></div>
        </div>

        <div className="flex flex-col justify-center max-w-[320px] w-full py-10 m-auto">
          <StepBackButton href="/login" />
          <div className="flex flex-col max-w-[120px]">
            <Logo />
          </div>

          <div className="flex flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">
                <div className="flex flex-col gap-[12px]">
                  <h2 className="text-lg font-bold text-green-600">Ativar produto</h2>
                  <div>
                    <p className="text-md">
                      Insira o id da transação da compra feita na hotmart para validar sua assinatura.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <FormTextInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Email da compra na hotmart"
                  />
                  <FormTextInput
                    control={form.control}
                    name="id"
                    label="Id da transação hotmart"
                    placeholder="Ex.: HP002194321"
                  />
                </div>

                <Button
                  className="w-full h-[40px] cursor-pointer mt-6 bg-green-600 hover:bg-green-700"
                  disabled={pending}
                >
                  Validar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
