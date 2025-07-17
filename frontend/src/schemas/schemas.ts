import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const cleanNonDigits = (value: string) => value.replace(/\D/g, "");
const nameRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "O campo nome é obrigatório.")
      .regex(nameRegex, "O nome deve conter apenas letras e espaços."),
    email: z.string().email({ message: "Email inválido." }),
    phoneNumber: z
      .string()
      .transform(cleanNonDigits)
      .pipe(z.string().length(11, "O telefone deve ter 11 dígitos (DDD + número).")),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    documentType: z.enum(["CPF", "CNPJ"]),
    documentNumber: z.string().transform(cleanNonDigits), // Just clean it here
    segment: z.string().optional(),
    mainActivity: z.string().optional(),
    termsAndConditions: z.boolean().refine((value) => value, {
      message: "Você deve aceitar os termos e condições.",
    }),
  })
  .superRefine((data, ctx) => {
    // CPF validation
    if (data.documentType === "CPF") {
      if (data.documentNumber.length !== 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O CPF deve ter exatamente 11 dígitos.",
          path: ["documentNumber"], // Path to the field that has the error
        });
      }
    }

    // CNPJ validation
    if (data.documentType === "CNPJ") {
      if (data.documentNumber.length !== 14) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O CNPJ deve ter exatamente 14 dígitos.",
          path: ["documentNumber"],
        });
      }

      if (data.segment === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O segmento é obrigatório.",
          path: ["segment"],
        });
      }

      if (data.mainActivity === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A atividade principal é obrigatória.",
          path: ["mainActivity"],
        });
      }
    }
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export const createTransactionFormSchema = z.object({
  description: z.string().min(1, "Campo descrição é obrigatório"),
  categoryId: z.string().min(1, "Campo categoria é obrigatório"),
  paymentMethodId: z.string().min(1, "Campo forma de pagamento é obrigatório"),
  status: z.enum(["pending", "completed"], {
    required_error: "Campo status é obrigatório",
    invalid_type_error: "Campo status é obrigatório",
  }),
  amount: z.string().min(1, "Campo valor é obrigatório"),
  date: z.date({
    required_error: "Campo data é obrigatório",
    invalid_type_error: "Formato de data inválido",
  }),
  type: z.enum(["income", "expense"], {
    required_error: "Campo tipo é obrigatório",
    invalid_type_error: "Campo tipo é obrigatório",
  }),
  installments: z.string().optional(),
});
export type CreateTransactionFormType = z.infer<typeof createTransactionFormSchema>;

export const updateTransactionFormSchema = z.object({
  description: z.string().min(1, "Campo descrição é obrigatório"),
  categoryId: z.string().min(1, "Campo categoria é obrigatório"),
  status: z.enum(["pending", "completed"], {
    required_error: "Campo status é obrigatório",
    invalid_type_error: "Campo status é obrigatório",
  }),
  amount: z.string().min(1, "Campo valor é obrigatório"),
  date: z.date({
    required_error: "Campo data é obrigatório",
    invalid_type_error: "Formato de data inválido",
  }),
  type: z.enum(["income", "expense"], {
    required_error: "Campo tipo é obrigatório",
    invalid_type_error: "Campo tipo é obrigatório",
  }),
  installments: z.string().optional(),
  paymentMethodId: z.string().optional(),
});
export type UpdateTransactionFormType = z.infer<typeof updateTransactionFormSchema>;

export const deleteTransactionSchema = z.object({
  id: z.string().min(1, "Campo id é obrigatório"),
});
export type DeleteTransactionType = z.infer<typeof deleteTransactionSchema>;
