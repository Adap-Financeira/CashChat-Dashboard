"use client";
import { Computer, Moon, Sun, UserRound, LogOut, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeaderMenu() {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarFallback>ADP</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">Guilherme</span>
          <span className="text-muted-foreground truncate text-xs font-normal">guilherme@cashchat.com</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRound />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Alterar tema</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun />
              Claro
              {theme === "light" && <Check className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon />
              Escuro
              {theme === "dark" && <Check className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Computer />
              Sistema
              {theme === "system" && <Check className="ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
