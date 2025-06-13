"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

export default function InputPassword({ label, error, ...props }: InputPasswordProps) {
  const [isView, setIsView] = useState(false);
  return (
    <div className="relative">
      <Label className="text-md mb-2" htmlFor={props.id}>
        {label}
      </Label>
      <Input type={isView ? "text" : "password"} className="px-5 h-[56px]" {...props} />
      {error && <span className="text-sm text-red-400">{error}</span>}
      <button
        type="button"
        className="transition-all duration-300"
        onClick={() => setIsView((prev) => !prev)}
      >
        {isView ? (
          <Eye className="absolute right-4 top-12 z-10 cursor-pointer text-gray-500" />
        ) : (
          <EyeOff className="absolute right-4 top-12 z-10 cursor-pointer text-gray-500" />
        )}
      </button>
    </div>
  );
}
