import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

interface NavButtonProps {
  label: string;
  href: string;
  selected?: boolean;
}

export default function NavButton({ label, href, selected = false }: NavButtonProps) {
  const searchParams = useSearchParams();

  // Create a new URLSearchParams object with current search params
  const params = new URLSearchParams(searchParams.toString());

  return (
    <Link
      href={{
        pathname: href,
        search: params.toString(),
      }}
      className="flex flex-col"
    >
      <Button className={`cursor-pointer ${selected ? "text-muted-foreground" : ""}`} variant="ghost">
        {label}
      </Button>
    </Link>
  );
}
