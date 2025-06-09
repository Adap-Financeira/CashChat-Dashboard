import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import CategoryModal from "../modals/category/CategoryModal";
import DeleteCategoryModal from "../modals/category/DeleteCategoryModal";
import { toast } from "sonner";
import { getCookie } from "@/app/actions";

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
  async function handleDelete() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${await getCookie("token")};`,
      },
      body: JSON.stringify({ categoryId: id }),
      cache: "no-store",
      credentials: "include",
    });
    const responseData = await response.json();
    if (!response.ok) {
      toast.error(responseData.error);
      return;
    }
    toast.success(responseData.message);
  }

  return (
    <div className="flex items-center justify-between pr-3 gap-2 bg-gray-100 dark:bg-gray-800 h-[52px] rounded-md relative">
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
        <DeleteCategoryModal handleDelete={handleDelete}>
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
