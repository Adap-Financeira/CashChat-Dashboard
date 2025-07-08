import Image from "next/image";
import React from "react";
import human from "@/assets/human.png";
import logo from "@/assets/logo.png";

export default function ThankYouPage() {
  return (
    <div className="bg-white h-screen flex justify-center font-sans">
      <div className="flex mx-auto px-6 md:px-8 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 text-left">
            <Image src={logo} alt="Adap Financeira Logo" className="w-44 h-auto self-start" />

            <h1 className="text-2xl font-bold text-blue-500 leading-tight">
              Parabéns, Agora você faz parte da Comunidade ADAP
            </h1>

            <p className="text-xs text-gray-500 font-light tracking-wide">
              ENTÃO, PARE TUDO QUE ESTÁ FAZENDO E VENHA CONHECER OS NOSSOS PRODUTOS E VANTAGENS ÚNICAS!
            </p>

            <div className="space-y-4 text-gray-800">
              <p>
                Na ADAP, oferecemos um produto pensado para o seu dia a dia. Com um time de suporte para te
                atender quando surgir uma dúvida e uma comunidade exclusiva para ficar por dentro de todas as
                informações importante.
              </p>
              <p className="font-semibold">
                Para Liberar a sua Assistente, peço que envie uma mensagem clicando no botão abaixo!
              </p>
            </div>

            <button className="w-full max-w-[300px] sm:w-auto px-10 py-3 bg-green-600 text-white font-bold rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 self-center md:self-start cursor-pointer">
              Quero minha Assistente
            </button>
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
