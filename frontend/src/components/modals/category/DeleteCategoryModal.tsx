"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { deleteCategory } from "@/api/categories";

interface CategoryModalProps {
  children: React.ReactNode;
  id: string
}

const FormSchema = z.object({
  approved: z.boolean().refine((val) => val === true, {
    message: "Você deve aprovar a exclusão.",
  }),
});

// Modal for delete category
export default function DeleteCategoryModal({ children, id }: CategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      approved: false,
    },
  });

  const approved = form.watch("approved");

  async function onSubmit() {
    setLoading(true);
    try {
      await deleteCategory(id);
      toast.success("Categoria excluída com sucesso.");
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao excluir a categoria.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Tem certeza que deseja excluir esta categoria?</DialogTitle>
              <DialogDescription className="mt-1">
                Ao excluir uma categoria, todas as transações vinculadas serão excluidas também.
                <br />
                Marque a caixa abaixo para confirmar.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="approved"
              render={() => (
                <FormItem>
                  <FormField
                    control={form.control}
                    name="approved"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-center gap-2 mt-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                return checked ? field.onChange(true) : field.onChange(false);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Entendo que excluindo uma categoria, todas as transações vinculadas serão
                            excluidas também.
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-5">
              <span className="font-bold text-sm">Atenção:</span> Esta ação não pode ser desfeita.
            </div>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button className="cursor-pointer" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="cursor-pointer hover:bg-destructive hover:text-white"
                disabled={!approved || loading}
              >
                Excluir
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
