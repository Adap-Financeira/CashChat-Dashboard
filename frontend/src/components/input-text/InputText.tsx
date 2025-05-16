import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputTextProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

export default function InputText({ label, error, ...props }: InputTextProps) {
  return (
    <div>
      <Label className="text-md mb-2" htmlFor={props.id}>
        {label}
      </Label>
      <Input {...props} className="px-5 h-[56px] mb-0.5" />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}
