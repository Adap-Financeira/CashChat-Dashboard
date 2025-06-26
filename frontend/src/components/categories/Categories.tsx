"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Category from "../category/Category";
import { useState } from "react";
import CategoryModal from "../modals/category/CategoryModal";

interface CategoriesProps {
  categories: {
    _id: string;
    name: string;
    color: string;
  }[];
  colors: {
    name: string;
    value: string;
  }[];
}

export default function Categories({ categories, colors }: CategoriesProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between py-1">
        <Input
          className="w-[40%]"
          placeholder="Nome da categoria"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CategoryModal colors={colors}>
          <Button className="cursor-pointer">Adicionar categoria</Button>
        </CategoryModal>
      </div>
      <div className="flex flex-col gap-5">
        {filteredCategories.length === 0 && (
          <p className="text-center text-muted-foreground mt-7">Nenhuma categoria cadastrada.</p>
        )}
        {filteredCategories.map((category) => (
          <Category
            key={category._id}
            id={category._id}
            name={category.name}
            color={category.color}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
}
