import { DateTimePicker24h } from "../date-pickers/DateTimePicker24h";
import { Label } from "../ui/label";

interface InputDateProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  date: Date;
  updateDate: (date: Date) => void;
}

export default function InputDate({ label, error, date, updateDate, ...props }: InputDateProps) {
  return (
    <div>
      <Label className="text-md mb-2" htmlFor={props.id}>
        {label}
      </Label>
      <DateTimePicker24h date={date} setDate={updateDate} />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}
