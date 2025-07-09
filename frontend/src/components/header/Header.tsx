"use client";
import { usePathname } from "next/navigation";
import HeaderDrawer from "./drawer/HeaderDrawer";
import HeaderMenu from "./menu/HeaderMenu";
import NavButton from "../nav-button/NavButton";
import Logo from "../logo/Logo";

export default function Header() {
  const path = usePathname();
  return (
    <header className="flex bg-background px-auto w-full absolute left-0 py-2 border-b">
      <div className="flex justify-between items-center mx-auto w-full max-w-[1600px] px-[var(--padding)]">
        <Logo className="w-24" />
        <nav className="flex gap-5 items-center">
          <div className="gap-5 items-center hidden lg:flex">
            <NavButton label="Dashboard" href="/dashboard" selected={path === "/dashboard"} />
            <NavButton label="Transações" href="/transactions" selected={path === "/transactions"} />
            <NavButton label="Lembretes" href="/reminders" selected={path === "/reminders"} />
            <NavButton label="Categorias" href="/categories" selected={path === "/categories"} />
            <HeaderMenu />
          </div>
          <HeaderDrawer />
        </nav>
      </div>
    </header>
  );
}
