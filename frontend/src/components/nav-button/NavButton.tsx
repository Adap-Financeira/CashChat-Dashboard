import Link from "next/link";
import { Button } from "../ui/button";
interface NavButtonProps {
  label: string;
  href: string;
  selected?: boolean;
}

export default function NavButton({ label, href, selected = false }: NavButtonProps) {
  return (
    <Link href={href} className="flex flex-col">
      <Button className={`cursor-pointer ${selected && "text-muted-foreground"}`} variant="ghost">
        {label}
      </Button>
    </Link>
  );
}
