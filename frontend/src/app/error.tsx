'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-center text-destructive">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-semibold">Algo deu errado</h2>
        <p className="text-muted-foreground">
          Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Button variant="outline" onClick={() => reset()}>
            Tentar novamente
          </Button>
          <Button variant="destructive" onClick={() => window.location.href = "/"}>
            Voltar para o início
          </Button>
        </div>
      </div>
    </div>
  );
}
