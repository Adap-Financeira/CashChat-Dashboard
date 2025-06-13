import { getCookie } from "@/app/actions";
import Categories from "@/components/categories/Categories";

async function getCategories() {
  const token = await getCookie("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token};`,
    },
    cache: "no-store",
    credentials: "include",
  });
  const data: {
    _id: string;
    name: string;
    color: string;
  }[] = await response.json();
  return data;
}

async function getColors() {
  const token = await getCookie("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colors/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token};`,
    },
    cache: "no-store",
    credentials: "include",
  });
  const data: {
    id: string;
    name: string;
    value: string;
  }[] = await response.json();
  return data;
}

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
