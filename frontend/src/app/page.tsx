import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import example1 from "@/assets/example1.png";
import example2 from "@/assets/example2.png";
import bannerSection from "@/assets/bannerSection.png";
import { Banknote, CalendarDays, Headset, Lock, Send } from "lucide-react";
import { BenefitIcon } from "@/components/benefit-icon/BenefitIcon";
import FeatureCard from "@/components/feature-card/FeatureCard";
import StatCard from "@/components/stat-card/StatCard";
import { Separator } from "@/components/ui/separator";
import FeedbackCard from "@/components/feedback-card/FeedbackCard";
import PricingCard from "@/components/pricing-card/PricingCard";
import FaqAccordion from "@/components/faq-accordion/FaqAccordion";
import LandingPageMainButton from "@/components/LandingPageMainButton";
import {
  expenseTrackingFeature,
  incomeTrackingFeature,
  appointmentTrackingFeature,
  analyticsFeature,
  testimonials,
  stats,
  plans,
  faqItems,
} from "@/landing-page-content";

export default async function Home() {
  return (
    <div className="flex flex-col gap-5 bg-background">
      <header className="flex justify-between items-center py-2 px-4">
        <Image src={logo} alt="Logo" className="w-36 md:w-48 lg:w-3xs pointer-events-none" />
        <div className="flex gap-5 items-center">
          <a href="#how_it_works" className="text-green-600 hidden md:block">
            Como funciona
          </a>
          <a href="#feedbacks" className="text-green-600 hidden md:block">
            Avaliações
          </a>
          <a href="#plans" className="text-green-600 hidden md:block">
            Planos
          </a>
          <Link href="/login">
            <Button className="cursor-pointer bg-green-600 text-white hover:bg-green-700">Login</Button>
          </Link>
        </div>
      </header>
      <main className="px-4">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl text-center">
            <span className="text-blue-600">A gente cuida do seu dinheiro</span> pra você{" "}
            <span className="text-green-600">focar no que importa.</span>
          </h2>
          <h1 className="text-2xl text-center font-bold max-w-[850px] m-auto lg:text-3xl">
            Cansado de planilha e de se sentir perdido? Quer organizar as finanças direto pelo WhatsApp, de
            forma simples e automática.{" "}
          </h1>
          <div id="features" className="flex flex-wrap gap-4 justify-center mt-5">
            <BenefitIcon Icon={Lock} text="Segurança dos seus dados em primeiro lugar" />
            <BenefitIcon Icon={Banknote} text="Deixe o seu financeiro no automático" />
            <BenefitIcon Icon={CalendarDays} text="Seus compromissos organizados na sua mão" />
          </div>
          <LandingPageMainButton text="Quero organizar a minha empresa" href="/register" />
          <div className="flex flex-col md:flex-row gap-4 justify-center m-auto mt-10">
            <Image
              src={example1}
              alt="Exemplo funcionamento de compromissos."
              className="w-3xs md:w-1/3 max-w-[500px]"
            />
            <Image
              src={example2}
              alt="Exemplo funcionamento de compromissos."
              className="w-3xs md:w-1/3 max-w-[500px]"
            />
          </div>
        </section>
        <section className="mt-10 relative">
          <div
            className="flex flex-col gap-4 z-99 bg-contain bg-center bg-no-repeat w-full h-[400px]"
            style={{ backgroundImage: `url(${bannerSection.src})` }}
          ></div>
        </section>
        <section id="how_it_works" className="flex flex-col gap-9 py-12 sm:py-16 bg-white">
          <FeatureCard {...expenseTrackingFeature} videoPosition="right" />
          <Separator />
          <FeatureCard {...incomeTrackingFeature} videoPosition="left" />
          <Separator />
          <FeatureCard {...appointmentTrackingFeature} videoPosition="right" />
          <Separator />
          <FeatureCard {...analyticsFeature} videoPosition="left" />

          <LandingPageMainButton text="Começar agora mesmo" href="/register" />
        </section>
        <section id="feedbacks" className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              Clientes que <span className="text-green-600">transformaram suas vidas</span> com a ADAP
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Veja como a ADAP está ajudando pessoas reais a alcançar seus objetivos financeiros.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
              {testimonials.map((testimonial) => (
                <FeedbackCard
                  key={testimonial.id}
                  imgSrc={testimonial.imgSrc.src}
                  altText={testimonial.altText}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wide">Números que comprovam</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Faça parte da revolução da inteligência artificial e tenha um funcionário lhe ajudando 24 horas
              por dia com a sua vida.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>
        <section id="plans" className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold uppercase">Conheça nossos planos</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Escolha seu plano e comece a organizar suas finanças hoje.
            </p>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto items-center">
              {plans.map((plan, index) => (
                <PricingCard key={index} plan={plan} />
              ))}
            </div>
          </div>
        </section>
        <section id="faq" className="py-20 space-y-12">
          <div className="container mx-auto px-6 md:px-40 text-center space-y-8">
            <h2 className="text-2xl font-bold uppercase">Perguntas frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {faqItems.map((item, index) => (
                <FaqAccordion key={index} title={item.question} content={item.answer} />
              ))}
            </div>
          </div>
          <LandingPageMainButton text="Começar agora mesmo" href="/register" />
        </section>
        <section id="support" className="">
          <div className="w-full max-w-3xl mx-auto my-10 px-4">
            <div
              className="
              flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 
              bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              {/* Left Section: Icon and Text */}
              <div className="flex items-center gap-5 text-center sm:text-left">
                {/* Icon with colored background */}
                <div className="hidden sm:flex items-center justify-center h-16 w-16 rounded-full bg-green-100 flex-shrink-0">
                  <Headset className="h-8 w-8 text-green-600" strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Precisa de ajuda?</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Caso ainda tenha alguma dúvida, chame nosso time no WhatsApp.
                  </p>
                </div>
              </div>

              {/* Right Section: Button */}
              <a
                href={"https://wa.me/5512992444308"}
                target="_blank"
                rel="noopener noreferrer"
                className="
            bg-[#00b050] text-white font-bold py-3 px-6 rounded-lg 
            whitespace-nowrap transition-transform hover:scale-105 
            focus:outline-none focus:ring-4 focus:ring-green-500/30
            w-full sm:w-auto text-center
            "
              >
                Chamar agora
              </a>
            </div>
          </div>
        </section>
        <footer className="bg-slate-50 text-slate-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Main Footer Section */}
            <div className="py-16 flex flex-col md:flex-row md:justify-between gap-8">
              {/* Company Info & Socials (4 columns on large screens) */}
              <div className="">
                <h2 className="text-xl font-bold text-slate-900">ADAP Financeira</h2>
                <p className="mt-4 text-slate-600 max-w-sm">Seu melhor assistente sempre ao seu lado.</p>
              </div>

              {/* Newsletter Signup (4 columns on large screens) */}
              <div className="">
                <h3 className="font-semibold text-slate-900 tracking-wide">Fique por dentro das novidades</h3>
                <p className="mt-4 text-slate-600">
                  Receba as últimas notícias, artigos e recursos em sua caixa de entrada.
                </p>
                <form className="mt-4 flex gap-2">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="cursor-not-allowed flex-auto min-w-0 appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite seu e-mail"
                    disabled
                  />
                  <button
                    type="button"
                    className="inline-flex flex-none items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-sm">
              <p className="text-slate-500">
                © {new Date().getFullYear()} ADAP Financeira. Todos os direitos reservados.
              </p>
              <div className="flex gap-x-6 mt-4 sm:mt-0">
                <a href="#" className="hover:text-slate-900 transition-colors">
                  Termos de Serviço
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
