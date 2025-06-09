import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ColorToggleGroupProps {
  value: string;
  onChange: (value: string) => void;
  colors: {
    name: string;
    value: string;
  }[];
  error: string | undefined;
}

export function ColorToggleGroup({ value, onChange, colors, error }: ColorToggleGroupProps) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onChange} className="flex flex-col">
      <div>
        {colors.map((color) => (
          <ToggleGroupItem
            key={color.value}
            value={color.value}
            aria-label={`Toggle ${color.name}`}
            className="cursor-pointer"
          >
            <ColorSelector color={color.value} />
          </ToggleGroupItem>
        ))}
      </div>
      {error && <span className="text-sm text-red-400 mt-2 text-start w-full">{error}</span>}
    </ToggleGroup>
  );
}

function ColorSelector({ color }: { color: string }) {
  return (
    <div className="flex justify-center items-center">
      <span className="w-6 h-6 rounded" style={{ backgroundColor: color }}></span>
    </div>
  );
}
