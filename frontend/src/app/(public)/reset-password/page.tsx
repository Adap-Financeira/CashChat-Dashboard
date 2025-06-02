"use client";
import InputText from "@/components/input-text/InputText";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/schemas/schemas";
import { useAuth } from "@/context/AuthProvider";

interface FormErrors {
  email: string | undefined;
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: undefined,
  });
  const [pending, setPending] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(email);

    e.preventDefault();
    try {
      setPending(true);
      const result = resetPasswordSchema.safeParse({
        email,
      });

      if (!result.success) {
        const flat = result.error.flatten().fieldErrors;
        setFormErrors({
          email: flat.email?.[0],
        });
        setPending(false);
        return;
      }

      await resetPassword(email);

      toast.success(
        <div>
          Email enviado com sucesso! <br /> Verifique sua caixa de entrada.
        </div>
      );
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar email");
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
                <h2 className="text-lg font-bold">Esqueceu sua senha?</h2>
                <div>
                  <p className="text-md">
                    Não se preocupe! Basta digitar seu email e enviaremos um link para redefinir sua senha.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <InputText
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Ex.: email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={formErrors.email}
                />
              </div>

              <Button className="w-full h-[48px] cursor-pointer mt-6" disabled={pending}>
                Resetar senha
              </Button>
            </form>

            <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground">
              <p>Quer voltar para o login?</p>
              <Link href="/login" className="font-bold text-primary">
                Clique aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
