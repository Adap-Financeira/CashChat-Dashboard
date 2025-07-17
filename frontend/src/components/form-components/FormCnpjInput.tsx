import { FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormControl } from "../ui/form";
import { useCallback } from "react";

interface FormCnpjInputProps {
  control: any;
  name: string;
  placeholder?: string;
}

export default function FormCnpjInput({ control, name, placeholder }: FormCnpjInputProps) {
  const formatCnpj = useCallback((value: string) => {
    // Return an empty string for invalid or empty input
    if (!value) {
      return "";
    }

    // 1. Get only the digits and limit to 14.
    const cnpj = value.replace(/\D/g, "").slice(0, 14);

    // 2. Apply formatting based on the current length of the CNPJ.
    // The order of these checks is important.

    // Handles 13 or 14 digits (e.g., "13.213.231/2312-2" or "...-22")
    if (cnpj.length > 12) {
      // The key change is here: (\d{1,2}) matches the final 1 or 2 digits.
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, "$1.$2.$3/$4-$5");
    }

    // Handles 9 to 12 digits (e.g., "13.213.231/2312")
    if (cnpj.length > 8) {
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, "$1.$2.$3/$4");
    }

    // Handles 6 to 8 digits (e.g., "13.213.231")
    if (cnpj.length > 5) {
      return cnpj.replace(/(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
    }

    // Handles 3 to 5 digits (e.g., "13.213")
    if (cnpj.length > 2) {
      return cnpj.replace(/(\d{2})(\d{1,3})/, "$1.$2");
    }

    // Returns the digits if the length is 2 or less
    return cnpj;
  }, []);

  // This function remains the same, it correctly strips all formatting.
  const unformatCnpj = (value: string) => value.replace(/\D/g, "");
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
                value={formatCnpj(rawValue)}
                onChange={(e) => {
                  // Unformat the input from the user to get raw digits
                  const cleaned = unformatCnpj(e.target.value);
                  // Prevent the user from typing more than 11 digits
                  if (cleaned.length === 15) {
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
