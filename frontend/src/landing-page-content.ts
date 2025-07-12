import { Banknote, ClipboardList, Landmark, LineChart, ListOrdered, Users, Wallet } from "lucide-react";
import GoodFeedback1 from "@/assets/goodFeedback1.png";
import GoodFeedback2 from "@/assets/goodFeedback2.png";

export const expenseTrackingFeature = {
  Icon: Wallet,
  title: "Registre todos os seus gastos no WhatsApp",
  description: "Registre suas despesas diretamente pelo WhatsApp.",
  subDescription:
    "Basta enviar uma mensagem para nosso assistente virtual e ele lançará automaticamente em sua conta.",
  features: [
    "Registro rápido por mensagem de texto.",
    "Categorização inteligente.",
    "Praticidade e comodidade.",
  ],
};

// Data for the "Receitas" (Income) section
export const incomeTrackingFeature = {
  Icon: Banknote,
  title: "Anote todas as suas receitas pelo WhatsApp",
  description: "Cadastre seus ganhos de forma simples, enviando uma mensagem para nosso assistente virtual.",
  subDescription: "Ele cuida do lançamento automático na sua conta para que você tenha total controle.",
  features: [
    "Registro fácil via mensagem de texto.",
    "Categorização automática e inteligente.",
    "Mais praticidade e conforto no seu dia a dia.",
  ],
};

// Data for the "Compromissos" (Appointments) section
export const appointmentTrackingFeature = {
  Icon: ListOrdered,
  title: "Anote seus compromissos pelo WhatsApp",
  description: "Mantenha sua agenda em ordem, com tudo acessível na palma da sua mão.",
  subDescription:
    "É só mandar uma mensagem para nosso assistente virtual e o compromisso será registrado automaticamente.",
  features: [
    "Registro ágil por mensagem de texto.",
    "Organização inteligente de agendamentos.",
    "Mais praticidade e facilidade para sua rotina.",
  ],
};

export const analyticsFeature = {
  Icon: LineChart,
  title: "Receba gráficos personalizados",
  description:
    "Receba gráficos personalizados para ver onde está gastando o seu dinheiro e quais dias da semana mais está gastando.",
  subDescription:
    "É só mandar uma mensagem para sua assistente financeira e ela irá te gerar um gráfico para que fique ainda mais claro para onde está indo o seu dinheiro.",
  features: [
    "Gráficos de onde está gastando o seu dinheiro.",
    "Gráficos para ver qual dia da semana você mais gasta.",
  ],
};

export const stats = [
  {
    Icon: Users,
    value: "13.573",
    description: "microempreendedores já estão organizando seu financeiro.",
  },
  {
    Icon: ClipboardList,
    value: "153.647",
    description: "compromissos organizados e anotados.",
  },
  {
    Icon: Landmark,
    value: "1.3M",
    description: "economizados com a ferramenta.",
  },
];

export const plans = [
  {
    name: "Plano Mensal",
    subtitle: "Cancele quando quiser",
    price: "R$39,90",
    period: "mês",
    features: [
      { text: "Seu dinheiro organizado no piloto automático.", included: true },
      { text: "Liberte-se das planilhas complicadas para sempre.", included: true },
      { text: `Tome decisões baseadas em dados, não em "achismos".`, included: true },
      { text: "Descubra para onde seu dinheiro está indo.", included: true },
      { text: "Suporte especializado para te ajudar.", included: true },
    ],
    ctaText: "Iniciar meu teste grátis.",
  },
  {
    name: "Plano anual",
    subtitle: "Menos do que um café por dia",
    price: "R$29,90",
    period: "mês",
    isPopular: true,
    features: [
      { text: "Tudo do plano mensal", included: true },
      { text: "Novas funções Antecipadas", included: true },
      { text: "Comunidade Exclusiva", included: true },
      { text: "Bônus exclusivo 01", included: true },
      { text: "Bônus exclusivo 02", included: true },
    ],
    ctaText: "Iniciar meu teste grátis.",
  },
];

export const faqItems = [
  {
    question: "Por quanto tempo terei acesso a essa Assistente?",
    answer:
      "Após a compra, você terá acesso por um ano à assistente Direta Ao Ponto, podendo utilizá-la sempre que precisar. Além disso, caso sejam feitas melhorias ou atualizações na ferramenta, você receberá automaticamente a versão mais recente, garantindo que sempre terá em mãos o melhor método para gerenciar suas finanças de forma prática e eficiente.",
  },
  {
    question: "Eu ganho pouco. Ainda assim, essa Assistente vai me ajudar?",
    answer:
      "Sim! Organizar seu dinheiro não depende do quanto você ganha, mas de como você gerencia. A assistente te ajudará a identificar para onde seu dinheiro está indo, eliminar gastos desnecessários e começar a construir um patrimônio, independentemente da sua renda atual.",
  },
  {
    question: "Por que o Guilherme Shinye é a melhor pessoa para me ensinar?",
    answer:
      "Devido a sua experiência de anos investindo e estudando sobre o assunto, ao longo das aulas ele não irá focar em apenas uma introdução técnica de como utilizar a assistente, ele irá pegar na sua mão e te ajudar. Vamos te mostrar exatamente o método que milhares de pessoas estão utilizando para economizar milhares de reais. Não é uma fórmula mágica, mas um sistema comprovado, com resultados reais e prontos para serem aplicados na sua vida financeira.",
  },
  {
    question: "Como faço para começar a usar?",
    answer:
      'Basta clicar no botão "Garanta já", finalizar sua compra, cadastrar seus dados diretamente no WhatsApp e começar a conversar com o o seu assessor via WhatsApp.',
  },
  {
    question: "Quanto tempo preciso dedicar para usar essa assistente?",
    answer:
      "Menos de 1 minuto por dia! O objetivo é tornar a organização financeira algo simples e eficiente, sem precisar perder horas anotando cada centavo. Com poucos cliques, você terá uma visão completa das suas finanças e poderá tomar decisões mais inteligentes com seu dinheiro.",
  },
];
