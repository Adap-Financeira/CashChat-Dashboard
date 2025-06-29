"use client";
import Header from "@/components/header/Header";
import { useAuth } from "@/context/AuthProvider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={cn("h-10 w-10 animate-spin text-primary")} />

          <h2 className="text-xl font-semibold">Carregando...</h2>
          <p className="text-muted-foreground">Por favor, aguarde enquanto carregamos o conteúdo.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="py-18 px-[var(--padding)] lg:py-22">{children}</div>
    </div>
  );
}
