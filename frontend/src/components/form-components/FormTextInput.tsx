import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormControl } from "../ui/form";

interface FormTextInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
}

export default function FormTextInput({ control, name, label, placeholder }: FormTextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className="h-10" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
