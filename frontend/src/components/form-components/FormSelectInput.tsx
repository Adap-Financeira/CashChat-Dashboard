"use client";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormSelectInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  options: {
    value: string;
    label: string;
  }[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormSelectInput({
  control,
  name,
  label,
  placeholder,
  options,
  disabled,
  isOpen,
  onOpenChange,
}: FormSelectInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{label}</FormLabel>
          <Select
            open={isOpen}
            onOpenChange={(open) => onOpenChange?.(open)}
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[200px] overflow-y-auto z-[999]">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="capitalize">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
