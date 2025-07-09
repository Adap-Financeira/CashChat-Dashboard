"use client";
import Link from "next/link";
import Image from "next/image";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
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
    <Link href="/">
      {mounted && (
        <Image src={currentTheme === "dark" ? logoDark : logoLight} alt="Adap Financeira Logo" {...props} />
      )}
    </Link>
  );
}
