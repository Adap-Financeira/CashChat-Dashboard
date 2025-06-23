import { getColors } from "@/api/colors";
import { getCategories } from "@/api/categories";
import Categories from "@/components/categories/Categories";

// Check if user has permission
// If not, block the buttons for create, edit or delete categories

export default async function CategoriesPage() {
  const colors = await getColors();
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-5 max-h-screen">
      <div className="flex flex-col gap-5">
        <div className="mt-3">
          <h1 className="text-xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">
            Gerencie suas categorias para uma experiência mais personalizada.
          </p>
        </div>
        <div className="flex gap-5 w-full">
          <Categories categories={categories} colors={colors} />
        </div>
      </div>
    </div>
  );
}
