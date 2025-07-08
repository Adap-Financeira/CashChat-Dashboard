"use client";
import { Button } from "../ui/button";
import Image from "next/image";
import whatsappIcon from "@/assets/whatsapp.svg";

export default function WhatsappButton() {
  const handleClick = () => {
    window.open("https://wa.me/+5512992444308", "_blank");
  };

  return (
    <Button
      className="fixed bottom-5 p-2 right-5 z-50 bg-green-500 hover:bg-green-600 transition-colors duration-200 rounded-full cursor-pointer"
      variant={"default"}
      size={"icon"}
      onClick={handleClick}
    >
      <Image src={whatsappIcon} alt="WhatsApp" width={24} height={24} className="invert" />
    </Button>
  );
}
