"use client";
import Image from "next/image";
import logoDark from "@/assets/logo-dark.png";
import logo from "@/assets/logo.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({ ...props }: React.HTMLAttributes<HTMLImageElement>) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    mounted && <Image src={currentTheme === "dark" ? logoDark : logo} alt="Adap Financeira Logo" {...props} />
  );
}
