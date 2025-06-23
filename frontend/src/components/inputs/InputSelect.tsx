"use client";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InputSelectProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  onValueChange: (value: string) => void;
  options: string[];
}

export default function InputSelect({ label, error, options, onValueChange, ...props }: InputSelectProps) {
  return (
    <div>
      <Label className="text-md mb-2" htmlFor={props.id}>
        {label}
      </Label>
      <Select onValueChange={(value) => onValueChange(value)}>
        <SelectTrigger className="w-full h-md">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}
