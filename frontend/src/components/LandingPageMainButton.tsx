import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandingPageMainButtonProps {
  text: string;
  href?: string;
}

export default function LandingPageMainButton({ text, href }: LandingPageMainButtonProps) {
  return (
    <Link href={href || "/"} className="flex w-fit mx-auto">
      <Button className="flex w-fit cursor-pointer mt-4 m-auto px-6 py-7 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white">
        {text}
      </Button>
    </Link>
  );
}
