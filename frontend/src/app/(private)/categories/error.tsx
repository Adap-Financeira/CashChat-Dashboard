"use client";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center mt-[calc(40vh)] flex-col max-w-[50%] m-auto">
      <p className="text-center">Ocorreu um erro inesperado ao carregar as informações da página.</p>
      <p className="text-center">
        Se o erro persistir, não hesite em entrar em contato com o suporte para que possamos resolver o
        problema o mais rápido possível.
      </p>
    </div>
  );
}
