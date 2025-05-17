import InputPassword from "@/components/input-password/InputPassword";
import InputText from "@/components/input-text/InputText";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Register() {
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
              <form
                //onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
              >
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
                    placeholder="Ex.: email@email.com"
                    //error="Email inválido"
                  />

                  <InputText
                    label="Email"
                    id="email"
                    placeholder="Ex.: email@email.com"
                    //error="Email inválido"
                  />

                  <InputText
                    label="Email"
                    id="email"
                    placeholder="Ex.: email@email.com"
                    //error="Email inválido"
                  />

                  <InputPassword
                    label="Senha"
                    id="password"
                    placeholder="Ex.: 123546"
                    //error="Senha inválida"
                  />
                </div>

                <Button className="w-full h-[48px] cursor-pointer">Cadastrar</Button>
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
