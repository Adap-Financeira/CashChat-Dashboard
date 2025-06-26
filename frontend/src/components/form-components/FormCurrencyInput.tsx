import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormControl } from "../ui/form";
import { useCallback } from "react";

interface FormCurrencyInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
}

export default function FormCurrencyInput({ control, name, label, placeholder }: FormCurrencyInputProps) {
  const formatToCurrency = useCallback((value: string) => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");

    // Convert to float cents
    let floatValue = parseFloat(numericValue) / 100;

    if (isNaN(floatValue)) {
      floatValue = 0;
    }

    // Format as BRL currency (pt-BR), change as needed
    return floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, []);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="h-10"
              value={formatToCurrency(field.value)}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                field.onChange(raw); // store only digits in state
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
