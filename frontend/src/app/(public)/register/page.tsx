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
import FormCheckBox from "@/components/form-components/FormCheckBox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FreeTrialInfo from "@/components/FreeTrialInfo";
import { ChevronLeft } from "lucide-react";
import { content } from "@/content";

export default function Register() {
  const [pending] = useState(false);
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

      if (response.success) {
        toast.success(response.message);
        router.push("/thank-you");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Erro ao realizar cadastro");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ===== Left Column (Visuals) ===== */}
      <div className="hidden md:block md:w-1/2 h-screen sticky top-0">
        <FreeTrialInfo />
      </div>

      {/* ===== Right Column (Form) ===== */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center min-h-screen relative px-4">
        <ThemeButton className="absolute top-4 right-4" />

        <header className="flex md:hidden flex-col items-center pt-5 relative">
          <div className="flex items-center w-full mb-5">
            <Link href="/" className="flex items-center text-green-600 font-bold hover:underline text-sm">
              <ChevronLeft className="h-5 w-5" />
              <span>Voltar</span>
            </Link>
          </div>

          {/* Título Principal */}
          <div className="flex flex-col items-center">
            <h1 className="flex text-xl font-bold mb-4 gap-1 flex-wrap">
              Comece agora o seu <span className="text-green-600">teste grátis</span>
            </h1>
            <p className="text-xs text-muted-foreground mb-6 text-center max-w-96">
              Com a ADAP todo o seu financeiro fica organizado, de forma automática, bem na palma da sua mão.
            </p>
          </div>
        </header>

        {/* Your original form container, it fits perfectly inside the right column now. */}
        <div className="flex flex-col justify-center max-w-[400px] w-full md:mt-10">
          <div className="flex flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">
                <div className="flex flex-col gap-[12px]">
                  <h2 className="text-base md:text-lg font-bold text-green-600">Seja um Adaptado(a)</h2>
                  <p className="text-xs md:text-base text-muted-foreground">
                    Coloque o seu financeiro no piloto automático para focar no que realmente importa.
                  </p>
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

                  {/* Checkbox Label for confirmation */}
                  {/* <FormCheckBox control={form.control} name="confirm" label="Confirmar" /> */}
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" />
                    <Label className="text-xs" htmlFor="terms">
                      Declaro ter lido e aceitado os{" "}
                      <Link href="#" className="text-green-700 font-bold hover:underline">
                        termos e políticas de serviço
                      </Link>
                    </Label>
                  </div>
                </div>

                <Button
                  className="w-full h-[40px] cursor-pointer mt-6 bg-green-600 hover:bg-green-700"
                  disabled={pending}
                >
                  Criar conta
                </Button>
              </form>
            </Form>

            <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground">
              <p>Já tem uma conta?</p>
              <Link href="/login" className="font-bold text-green-600 hover:underline">
                Entrar
              </Link>
            </div>
          </div>
        </div>

        {/* Lista de Recursos */}
        <div className="flex md:hidden w-full max-w-[400px] justify-center relative mt-10">
          <div className="space-y-4">
            {content.register.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600">
                    {<feature.icon className="h-4 w-4 text-white" />}
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-sm">{feature.title}</h2>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé */}
        <footer className="mt-5 mb-10">
          <p className="text-xs text-muted-foreground">{content.register.ctaText}</p>
        </footer>
      </div>
    </div>
  );
}
