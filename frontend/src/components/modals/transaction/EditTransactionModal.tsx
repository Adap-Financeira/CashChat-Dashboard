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
} from "@/components/ui/dialog-scrollable";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { getCategories } from "@/api/categories";
import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "@/api/payment-methods";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "@/components/form-components/FormTextInput";
import FormSelectInput from "@/components/form-components/FormSelectInput";
import FormCurrencyInput from "@/components/form-components/FormCurrencyInput";
import FormDateInput from "@/components/form-components/FormDateInput";
import { updateTransactionFormSchema, UpdateTransactionFormType } from "@/schemas/schemas";
import { installmentList, PaymentMethod, paymentMethods as paymentMethodsList } from "@/utils/payments";
import { Transaction } from "@/types/transaction";
import { updateTransaction } from "@/api/transactions";

interface EditTransactionModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  data: Transaction;
}

// Modal for edit transactions
export default function EditTransactionModal({ open, onOpenChange, data }: EditTransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [currentSelectField, setCurrentSelectField] = useState<string | null>(null);

  const form = useForm<UpdateTransactionFormType>({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      description: data.description,
      categoryId: data.category,
      status: data.status,
      amount: String(data.amount * 100),
      date: new Date(data.date),
      type: data.type,
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

  async function handleSubmit(formData: UpdateTransactionFormType) {
    try {
      setLoading(true);
      const response = await updateTransaction({
        transactionId: data._id,
        data: {
          description: formData.description,
          status: formData.status,
          amount: Number(formData.amount) / 100, // Convert to real R$ from cents
          date: formData.date.toISOString(),
          type: formData.type,
          categoryId: formData.categoryId,
        },
      });

      toast.success(response.message);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[850px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader className="mb-5">
              <DialogTitle>Editar transação</DialogTitle>
              <DialogDescription>
                Faça alterações na transação aqui. Clique em salvar quando terminar.
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
                name="paymentMethod"
                label="Forma de pagamento"
                disabled
                placeholder="Selecione uma forma de pagamento"
                options={
                  paymentMethods?.map((paymentMethod) => ({
                    value: paymentMethod._id,
                    label: paymentMethodsList[paymentMethod.type as PaymentMethod],
                  })) || []
                }
                isOpen={currentSelectField === "paymentMethod"}
                onOpenChange={(open) => {
                  setCurrentSelectField(open ? "paymentMethod" : null);
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
                disabled={data.paymentMethod === "credit"}
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
                label="Data"
                disabled={data.paymentMethod === "credit"}
                placeholder="Selecione uma data"
              />

              {data.paymentMethod === "credit" && (
                <FormSelectInput
                  control={form.control}
                  name="installments"
                  label="Parcelas"
                  disabled
                  placeholder="Selecione uma parcela"
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
                Salvar alterações
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
