import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import CategoryModal from "../modals/category/CategoryModal";
import DeleteCategoryModal from "../modals/category/DeleteCategoryModal";

interface CategoryProps {
  id: string;
  name: string;
  color: string;
  colors: {
    name: string;
    value: string;
  }[];
}

export default function Category({ id, name, color, colors }: CategoryProps) {
  return (
    <div className="flex items-center justify-between pr-3 gap-2 border h-[52px] rounded-md relative">
      <span
        className="w-2 h-full rounded-md absolute left-0 top-0 rounded-tr-none rounded-br-none"
        style={{ backgroundColor: color }}
      ></span>
      <h1 className="ml-6 text-primary capitalize">{name}</h1>
      <div className="flex gap-0.5">
        <CategoryModal data={{ id, name, color }} colors={colors}>
          <Button variant="ghost" className="p-2 cursor-pointer hover:text-blue-500">
            <div className="flex justify-center items-center w-6 h-6">
              <Edit width={20} height={20} />
            </div>
          </Button>
        </CategoryModal>
        <DeleteCategoryModal id={id}>
          <Button variant="ghost" className="p-2 cursor-pointer hover:text-destructive">
            <div className="flex justify-center items-center w-6 h-6">
              <Trash width={20} height={20} />
            </div>
          </Button>
        </DeleteCategoryModal>
      </div>
    </div>
  );
}
