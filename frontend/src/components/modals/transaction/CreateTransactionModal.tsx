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
} from "@/components/ui/dialog-scrollable";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { getCategories } from "@/api/categories";
import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "@/api/payment-methods";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "@/components/form-components/FormTextInput";
import FormSelectInput from "@/components/form-components/FormSelectInput";
import FormCurrencyInput from "@/components/form-components/FormCurrencyInput";
import FormDateInput from "@/components/form-components/FormDateInput";
import { createTransactionFormSchema } from "@/schemas/schemas";
import { createTransaction } from "@/api/transactions";
import {
  getPaymentMethodKeyByLabel,
  PaymentMethod,
  paymentMethods as paymentMethodsList,
} from "@/utils/payments";
import { Transaction } from "@/types/transaction";

interface CreateTransactionModalProps {
  children: React.ReactNode;
}

// Modal for create transactions
export default function CreateTransactionModal({ children }: CreateTransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createTransactionFormSchema>>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      description: "",
      category: "",
      paymentMethod: "",
      status: "concluído",
      amount: String("0"),
      date: new Date(),
      type: "",
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: paymentMethods } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
  });

  async function handleSubmit(data: z.infer<typeof createTransactionFormSchema>) {
    try {
      setLoading(true);

      //Get the id of category name selected
      const categoryId = categories?.find((category) => category.name === data.category)?._id;

      // Get the id of payment method name selected
      const paymentMethodId = paymentMethods?.find(
        (paymentMethod) => paymentMethod.type === getPaymentMethodKeyByLabel(data.paymentMethod.toLowerCase())
      )?._id;

      const response = await createTransaction({
        description: data.description,
        status: data.status === "concluído" ? "completed" : "pending",
        amount: Number(data.amount) / 100, // Convert to real R$ from cents
        date: data.date,
        type: data.type === "receita" ? "income" : "expense",
        categoryId: categoryId!,
        paymentMethodId: paymentMethodId!,
        installmentsCount: Number(data.installments),
      });

      toast.success(response.message);
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[850px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader className="mb-5">
              <DialogTitle>{"Adicionar transação"}</DialogTitle>
              <DialogDescription>
                {"Preencha os campos abaixo para adicionar uma nova transação."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-4">
              <FormTextInput
                control={form.control}
                name="description"
                label="Descrição"
                placeholder="Ex.: Alimentação"
              />

              <FormSelectInput
                control={form.control}
                name="category"
                label="Categoria"
                placeholder="Selecione uma categoria"
                options={categories?.map((category) => category.name) || []}
              />

              <FormSelectInput
                control={form.control}
                name="paymentMethod"
                label="Forma de pagamento"
                placeholder="Selecione uma forma de pagamento"
                options={
                  paymentMethods?.map(
                    (paymentMethod) => paymentMethodsList[paymentMethod.type as PaymentMethod]
                  ) || []
                }
              />

              <FormSelectInput
                control={form.control}
                name="status"
                label="Status"
                placeholder="Selecione um status"
                options={["pendente", "concluído"]}
              />

              <FormSelectInput
                control={form.control}
                name="type"
                label="Tipo"
                placeholder="Selecione um tipo"
                options={["receita", "despesa"]}
              />

              <FormCurrencyInput
                control={form.control}
                name="amount"
                label="Valor"
                placeholder="Ex.: 100.00"
              />

              <FormDateInput
                control={form.control}
                name="date"
                label={form.watch("paymentMethod") === "Crédito" ? "Data da fatura do cartão" : "Data"}
                placeholder="Selecione uma data"
              />

              {form.watch("paymentMethod") === "Crédito" && (
                <FormSelectInput
                  control={form.control}
                  name="installments"
                  label="Parcelas"
                  placeholder="Selecione uma parcela"
                  options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                />
              )}
            </div>

            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button type="button" className="cursor-pointer" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer" disabled={loading}>
                {"Adicionar transação"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
