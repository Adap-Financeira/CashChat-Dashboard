"use client";
import { Computer, Moon, Sun, LogOut, Check } from "lucide-react";
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
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarFallback>ADP</AvatarFallback>
          <AvatarImage src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Ddefault%2Buser&psig=AOvVaw2E3E_tEW2KEVAeunSv30Bq&ust=1752010845498000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjt9JLbq44DFQAAAAAdAAAAABAE" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{user?.displayName}</span>
          <span className="text-muted-foreground truncate text-xs font-normal">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Not working yet */}
        {/* <DropdownMenuItem>
          <UserRound />
          Perfil
        </DropdownMenuItem> */}
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
