import { useCallback } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormCpfInputProps {
  control: any;
  name: string;
  placeholder?: string;
}

export default function FormCpfInput({ control, name, placeholder }: FormCpfInputProps) {
  const formatCpf = useCallback((value: string) => {
    // 1. Start by removing all non-digit characters.
    const cpf = value.replace(/\D/g, "").slice(0, 11);

    if (!cpf) {
      return "";
    }

    let formattedCpf = cpf;

    // Apply the CPF mask (999.999.999-99)
    formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
    formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
    formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return formattedCpf;
  }, []);

  // This function remains the same, it correctly strips all formatting.
  const unformatCpf = (value: string) => value.replace(/\D/g, "");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // The raw value from the form state should be just digits
        const rawValue = field.value ?? "";

        return (
          <FormItem className="flex-1">
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                value={formatCpf(rawValue)}
                onChange={(e) => {
                  // Unformat the input from the user to get raw digits
                  const cleaned = unformatCpf(e.target.value);
                  // Prevent the user from typing more than 11 digits
                  if (cleaned.length === 12) {
                    return;
                  }
                  // Update the form state with only the raw digits
                  field.onChange(cleaned);
                }}
                className="h-10 w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
