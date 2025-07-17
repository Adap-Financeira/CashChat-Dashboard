import { Control, FieldValues, Path, useController } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface FormCheckBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
}

export default function FormCheckBox<T extends FieldValues>({
  control,
  name,
  label,
  className = "",
}: FormCheckBoxProps<T>) {
  const {
    field: { value = false, onChange, ...field },
  } = useController({
    control,
    name,
    defaultValue: false as any,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={`flex flex-col items-start space-y-0 ${className}`}>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                {...field}
                checked={!!value}
                onCheckedChange={(checked) => {
                  onChange(checked);
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
