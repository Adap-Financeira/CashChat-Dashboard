"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface StepBackButtonProps {
  href: string;
}

export default function StepBackButton({ href }: StepBackButtonProps) {
  return (
    <div className="flex items-center w-full mb-5">
      <Link href={href} className="flex items-center text-green-600 font-bold hover:underline text-sm">
        <ChevronLeft className="h-5 w-5" />
        <span>Voltar</span>
      </Link>
    </div>
  );
}
