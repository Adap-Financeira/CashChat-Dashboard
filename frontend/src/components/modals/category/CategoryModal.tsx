"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ColorToggleGroup } from "@/components/color-toggle-group/ColorToggleGroup";
import { toast } from "sonner";
import { getCookie } from "@/app/actions";
import InputText from "@/components/input-text/InputText";

interface CategoryModalProps {
  children: React.ReactNode;
  data?: {
    id: string;
    name: string;
    color: string;
  };
  colors: {
    value: string;
    name: string;
  }[];
}

interface FormErrors {
  name: string | undefined;
  color: string | undefined;
}

// Modal for create or edit categories
export default function CategoryModal({ children, data, colors }: CategoryModalProps) {
  const [name, setName] = useState(data?.name || "");
  const [color, setColor] = useState<string>(data?.color || "");
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: undefined,
    color: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isEdition = !!data;

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      if (!name || !color) {
        setFormErrors({
          name: !name ? "O campo nome não pode estar vazio." : undefined,
          color: !color ? "Selecione uma cor." : undefined,
        });
        return;
      }
      const token = await getCookie("token");

      const response = !isEdition
        ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: `token=${token};`,
            },
            body: JSON.stringify({ name, color }),
            cache: "no-store",
            credentials: "include",
          })
        : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Cookie: `token=${token};`,
            },
            body: JSON.stringify({ name, color, categoryId: data?.id }),
            cache: "no-store",
            credentials: "include",
          });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.error);
        setLoading(false);
        return;
      }

      toast.success(responseData.message);
      setName("");
      setColor("");
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar categoria.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdition ? "Editar categoria" : "Adicionar categoria"}</DialogTitle>
            <DialogDescription>
              {isEdition
                ? "Faça alterações na categoria aqui. Clique em salvar quando terminar."
                : "Preencha os campos abaixo para adicionar uma nova categoria."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4  mt-5">
            <InputText
              label="Nome"
              id="name"
              name="name"
              placeholder="Ex.: Alimentação"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={formErrors.name}
            />
            <div className="grid gap-3 pb-4">
              <Label htmlFor="color-1">Cor</Label>
              <ColorToggleGroup value={color} onChange={setColor} colors={colors} error={formErrors.color} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className="cursor-pointer" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {isEdition ? "Salvar alterações" : "Adicionar categoria"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
