import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useCallback } from "react";

interface FormPhoneInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
}

export default function FormPhoneInput({ control, name, label, placeholder }: FormPhoneInputProps) {
  const formatPhone = useCallback((value: string) => {
    // 1. Start by removing all non-digit characters.
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (!digits) {
      return "";
    }

    // 2. Apply formatting progressively using regex.
    // This approach avoids adding formatting characters prematurely.
    let formattedValue = digits;

    // Adds `(XX)` and a space after the first 2 digits are entered.
    // e.g., "119" becomes "(11) 9"
    formattedValue = formattedValue.replace(/^(\d{2})(\d)/, "($1) $2");

    // Adds a hyphen after the 7th digit (2 for DDD + 5 for the first part of the number).
    // e.g., "(11) 999998" becomes "(11) 99999-8"
    formattedValue = formattedValue.replace(/(\d{5})(\d)/, "$1-$2");

    return formattedValue;
  }, []);

  // This function remains the same, it correctly strips all formatting.
  const unformatPhone = (value: string) => value.replace(/\D/g, "");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // The raw value from the form state should be just digits
        const rawValue = field.value ?? "";

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                className="h-10"
                value={formatPhone(rawValue)}
                onChange={(e) => {
                  // Unformat the input from the user to get raw digits
                  const cleaned = unformatPhone(e.target.value);

                  if (cleaned.length > 11) {
                    return;
                  }
                  // Update the form state with only the raw digits
                  field.onChange(cleaned);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
