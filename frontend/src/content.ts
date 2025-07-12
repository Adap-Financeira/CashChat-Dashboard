import { Headphones, CreditCard, Smartphone } from "lucide-react";

export const content = {
  register: {
    title: "Comece agora o seu teste grátis",
    description:
      "Com a ADAP todo o seu financeiro fica organizado, de forma automática, bem na palma da sua mão.",
    features: [
      {
        icon: Smartphone,
        title: "Na palma da sua mão",
        description: "Lance todos os seus gastos direto do WhatsApp em menos de 5 segundos.",
      },
      {
        icon: Headphones,
        title: "Suporte Especializado e humanizado",
        description: "Suporte 100% humanizado para te guiar em qualquer dúvida.",
      },
      {
        icon: CreditCard,
        title: "Sem cobranças inesperadas",
        description: "Comece seu teste sem precisar cadastrar cartão.",
      },
    ],
    ctaText: "*planos superiores ou contratação à parte",
    form_title: "Seja um Adaptado(a)",
    form_description: "Coloque o seu financeiro no piloto automático para focar no que realmente importa.",
  },
  login: {
    form_title: "Bem vindo de volta!",
    form_description: "Organize suas finanças de maneira mais completa e profissional",
  },
};
