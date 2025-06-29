"use client";
import { Button } from "../ui/button";
import Image from "next/image";
import whatsappIcon from "@/assets/whatsapp.svg";

export default function WhatsappButton() {
  const handleClick = () => {
    // Replace with your WhatsApp contact link or action
    window.open("https://wa.me/your-number-here", "_blank");
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
