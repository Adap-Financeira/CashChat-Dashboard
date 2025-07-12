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

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BadgeDollarSign, ChartArea, List, LogOut, Menu, Monitor, Moon, Sun, Timer, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

export default function HeaderDrawer() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="lg:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="gap-1">
        <DrawerHeader className="pt-12 border-b">
          <div className="absolute top-3 right-3">
            <ToggleGroup type="single" value={theme}>
              <ToggleGroupItem value="light" aria-label="Toggle light mode" onClick={() => setTheme("light")}>
                <Sun className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Toggle dark mode" onClick={() => setTheme("dark")}>
                <Moon className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="system"
                aria-label="Toggle system preferred mode"
                onClick={() => setTheme("system")}
              >
                <Monitor className="h-5 w-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <DrawerTitle>
            <div className="text-2xl">{user?.displayName}</div>
          </DrawerTitle>
          <DrawerDescription>{user?.phoneNumber}</DrawerDescription>
        </DrawerHeader>
        <nav>
          <ul className="flex flex-col">
            <li>
              <HeaderDrawerNavButton
                label="Dashboard"
                href="/dashboard"
                setOpen={setOpen}
                icon={<ChartArea className="w-6 h-6" />}
                selected={path === "/dashboard"}
              />
            </li>
            <li>
              <HeaderDrawerNavButton
                label="Transações"
                href="/transactions"
                setOpen={setOpen}
                icon={<BadgeDollarSign className="w-6 h-6" />}
                selected={path === "/transactions"}
              />
            </li>
            <li>
              <HeaderDrawerNavButton
                label="Lembretes"
                href="/reminders"
                setOpen={setOpen}
                icon={<Timer className="w-6 h-6" />}
                selected={path === "/reminders"}
              />
            </li>
            <li>
              <HeaderDrawerNavButton
                label="Categorias"
                href="/categories"
                setOpen={setOpen}
                icon={<List className="w-6 h-6" />}
                selected={path === "/categories"}
              />
            </li>
          </ul>
        </nav>
        <DrawerFooter className="flex flex-row justify-between gap-2">
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive h-full grow cursor-pointer"
            onClick={() => logout()}
          >
            <LogOut className="w-6 h-6" />
            Sair
          </Button>
          <DrawerClose className="cursor-pointer border-1 p-2 rounded-md">
            <X />
          </DrawerClose>
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
  setOpen: (open: boolean) => void;
}

function HeaderDrawerNavButton({ label, href, icon, selected = false, setOpen }: HeaderDrawerNavButtonProps) {
  return (
    <Link href={href} className="flex grow relative" onClick={() => setOpen(false)}>
      <div
        className={`flex items-center justify-start gap-4 p-4 w-full cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 ${
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
