"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import Link from "next/link";
import { BadgeDollarSign, ChartArea, List, LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HeaderDrawer() {
  const path = usePathname();
  return (
    <Drawer direction="left">
      <DrawerTrigger className="lg:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="gap-1">
        <DrawerHeader className="pt-12 border-b">
          <DrawerTitle>
            <div className="text-2xl">Guilherme Garcia</div>
          </DrawerTitle>
          <DrawerDescription>+55 11 99999-9999</DrawerDescription>
        </DrawerHeader>
        <nav>
          <ul className="flex flex-col">
            <li>
              <HeaderDrawerNavButton
                label="Dashboard"
                href="/dashboard"
                icon={<ChartArea className="w-6 h-6" />}
                selected={path === "/dashboard"}
              />
            </li>
            <li>
              <HeaderDrawerNavButton
                label="Transações"
                href="/transactions"
                icon={<BadgeDollarSign className="w-6 h-6" />}
                selected={path === "/transactions"}
              />
            </li>
            <li>
              <HeaderDrawerNavButton
                label="Categorias"
                href="/categories"
                icon={<List className="w-6 h-6" />}
                selected={path === "/categories"}
              />
            </li>
          </ul>
        </nav>
        <DrawerFooter>
          <DrawerClose>Fechar</DrawerClose>
          <Button variant="ghost" className="text-destructive hover:text-destructive">
            <LogOut className="w-6 h-6" />
            Sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface HeaderDrawerNavButtonProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  selected?: boolean;
}

function HeaderDrawerNavButton({
  label,
  href,
  icon,
  selected = false,
}: HeaderDrawerNavButtonProps) {
  return (
    <Link href={href} className="flex grow relative">
      <div
        className={`flex items-center justify-start gap-4 p-5 w-full cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 ${
          selected && "text-muted-foreground"
        }`}
      >
        <span
          className={`w-0.5 h-full bg-accent/50 absolute left-0 ${
            selected ? "bg-primary" : "bg-transparent"
          }`}
        ></span>

        {icon}
        <span className="text-md">{label}</span>
      </div>
    </Link>
  );
}
