import Image from "next/image";
import React from "react";
import human from "@/assets/human.png";
import logo from "@/assets/logo.png";
import Link from "next/link";
import Logo from "@/components/logo/Logo";

export default function ThankYouPage() {
  return (
    <div className="bg-background h-screen flex justify-center font-sans">
      <div className="flex mx-auto px-6 md:px-8 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-4 text-left">
            <Logo className="w-50 h-auto self-start" />

            <h1 className="text-2xl font-bold text-blue-500 leading-tight">
              Parabéns, agora você faz parte da Comunidade ADAP
            </h1>

            <p className="text-xs text-muted-foreground font-light tracking-wide">
              ENTÃO, PARE TUDO QUE ESTÁ FAZENDO E VENHA CONHECER OS NOSSOS PRODUTOS E VANTAGENS ÚNICAS!
            </p>

            <div className="space-y-4">
              <p>
                <span className="font-semibold">Seja bem-vindo Adaptado!</span> <br /> Para iniciar seu teste
                basta clicar no botão abaixo que você será redirecionado direto para o WhatsApp. Caso prefira,
                o link foi enviado no seu e-mail também.
              </p>
            </div>

            <Link
              href="https://wa.me/5555992217140?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%2C%20pode%20me%20ajudar%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[300px] sm:w-auto px-10 py-3 bg-green-600 text-white font-bold rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 self-center md:self-start cursor-pointer"
            >
              Quero minha Assistente
            </Link>
          </div>

          <div className="md:order-last self-center md:self-end">
            <Image
              src={human}
              alt="Man smiling while looking at his phone"
              className="w-full max-w-sm md:max-w-lg h-auto object-cover align-center mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
