// src/components/landing/FreeTrialInfo.tsx
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Logo from "./logo/Logo";
import { content } from "@/content";

// Componente Principal
const FreeTrialInfo = () => {
  return (
    <section className="font-sans w-full max-w-4xl mx-auto px-6 sm:px-10">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center">
        <Link href="/" className="flex items-center text-green-600 font-bold hover:underline text-sm">
          <ChevronLeft className="h-5 w-5" />
          <span>Voltar</span>
        </Link>
        <Logo className="w-40" />
      </header>

      <main>
        {/* Título Principal */}
        <h1 className="text-3xl font-bold mb-4">
          Comece agora o seu <br />
          <span className="text-green-600">teste grátis</span>
        </h1>
        <p className="text-base text-muted-foreground mb-6">{content.register.description}</p>

        {/* Lista de Recursos */}
        <div className="relative">
          <div className="space-y-4">
            {content.register.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-11 w-11 rounded-full bg-green-600">
                    {<feature.icon className="h-5 w-5 text-white" />}
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-base">{feature.title}</h2>
                  <p className="text-base text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="mt-12">
        <p className="text-xs text-muted-foreground">{content.register.ctaText}</p>
      </footer>
    </section>
  );
};

export default FreeTrialInfo;
