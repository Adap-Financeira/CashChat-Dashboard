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

export const testimonials = [
  {
    id: 1,
    imgSrc: GoodFeedback1,
    altText: "Feedback positivo de cliente da ADAP sobre o produto",
  },
  {
    id: 2,
    imgSrc: GoodFeedback2,
    altText: "Depoimento de cliente Lucas Nazaro sobre o suporte da ADAP",
  },
];

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
    name: "Básico",
    subtitle: "Mais barato do que um lanche",
    price: "R$37",
    period: "ano",
    features: [
      { text: "Lançamentos ilimitados via WhatsApp", included: true },
      { text: "Relatórios detalhados", included: true },
      { text: "Suporte 24h", included: true },
      { text: "Lembretes de compromissos", included: true },
      { text: "Receba resumo da sua semana", included: true },
      { text: "Categorização com I.A.", included: false },
      { text: "Dicas de como economizar", included: false },
    ],
    ctaText: "EU QUERO COMEÇAR AGORA",
  },
  {
    name: "Plus",
    subtitle: "Economize 25%",
    price: "R$7,99",
    period: "mês",
    isPopular: true,
    features: [
      { text: "Lançamentos ilimitados via WhatsApp", included: true },
      { text: "Relatórios detalhados", included: true },
      { text: "Suporte 24h", included: true },
      { text: "Lembretes de compromissos", included: true },
      { text: "Receba resumo da sua semana", included: true },
      { text: "Categorização com I.A.", included: true },
      { text: "Dicas de como economizar", included: true },
    ],
    ctaText: "EU QUERO APROVEITAR AGORA",
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
