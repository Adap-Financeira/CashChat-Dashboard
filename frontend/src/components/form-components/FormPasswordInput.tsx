"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormControl } from "../ui/form";

interface FormPasswordInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
}

export default function InputPassword({ control, name, label, placeholder }: FormPasswordInputProps) {
  const [isView, setIsView] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                {...field}
                className="h-10 px-5"
                type={isView ? "text" : "password"}
              />
              <button
                type="button"
                className="transition-all duration-300"
                onClick={() => setIsView((prev) => !prev)}
              >
                {isView ? (
                  <Eye className="absolute w-5 h-5 right-4 top-[calc(20px-10px)] z-10 cursor-pointer text-muted-foreground" />
                ) : (
                  <EyeOff className="absolute w-5 h-5 right-4 top-[calc(20px-10px)] z-10 cursor-pointer text-muted-foreground" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
