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
import { installmentList, PaymentMethod, paymentMethods as paymentMethodsList } from "@/utils/payments";

interface CreateTransactionModalProps {
  children: React.ReactNode;
}

// Modal for create transactions
export default function CreateTransactionModal({ children }: CreateTransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentSelectField, setCurrentSelectField] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createTransactionFormSchema>>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      description: "",
      categoryId: "",
      paymentMethodId: "",
      status: "completed",
      amount: String("0"),
      date: new Date(),
      type: "expense",
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

  // Used to check if the payment method selected in the input is credit to show hidden input for installments
  const CREDIT_CARD_ID = paymentMethods?.find((paymentMethod) => paymentMethod.type === "credit")?._id;

  async function handleSubmit(data: z.infer<typeof createTransactionFormSchema>) {
    try {
      setLoading(true);

      const response = await createTransaction({
        description: data.description,
        status: data.status,
        amount: Number(data.amount) / 100, // Convert to real R$ from cents
        date: data.date,
        type: data.type,
        categoryId: data.categoryId,
        paymentMethodId: data.paymentMethodId,
        installmentsCount: Number(data.installments) || 1,
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
                name="categoryId"
                label="Categoria"
                placeholder="Selecione uma categoria"
                options={categories?.map((category) => ({ value: category._id, label: category.name })) || []}
                isOpen={currentSelectField === "categoryId"}
                onOpenChange={(open) => {
                  setCurrentSelectField(open ? "categoryId" : null);
                }}
              />

              <FormSelectInput
                control={form.control}
                name="paymentMethodId"
                label="Forma de pagamento"
                placeholder="Selecione uma forma de pagamento"
                options={
                  paymentMethods?.map((paymentMethod) => ({
                    value: paymentMethod._id,
                    label: paymentMethodsList[paymentMethod.type as PaymentMethod],
                  })) || []
                }
                isOpen={currentSelectField === "paymentMethodId"}
                onOpenChange={(open) => {
                  setCurrentSelectField(open ? "paymentMethodId" : null);
                }}
              />

              <FormSelectInput
                control={form.control}
                name="status"
                label="Status"
                placeholder="Selecione um status"
                options={[
                  { value: "pending", label: "Pendente" },
                  { value: "completed", label: "Concluído" },
                ]}
                isOpen={currentSelectField === "status"}
                onOpenChange={(open) => {
                  setCurrentSelectField(open ? "status" : null);
                }}
              />

              <FormSelectInput
                control={form.control}
                name="type"
                label="Tipo"
                placeholder="Selecione um tipo"
                options={[
                  { value: "income", label: "Receita" },
                  { value: "expense", label: "Despesa" },
                ]}
                isOpen={currentSelectField === "type"}
                onOpenChange={(open) => {
                  setCurrentSelectField(open ? "type" : null);
                }}
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
                label={form.watch("paymentMethodId") === CREDIT_CARD_ID ? "Data da fatura do cartão" : "Data"}
                placeholder="Selecione uma data"
              />

              {form.watch("paymentMethodId") === CREDIT_CARD_ID && (
                <FormSelectInput
                  control={form.control}
                  name="installments"
                  label="Parcelas"
                  placeholder="Parcelas"
                  options={installmentList}
                  isOpen={currentSelectField === "installments"}
                  onOpenChange={(open) => {
                    setCurrentSelectField(open ? "installments" : null);
                  }}
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
