type PaymentMethod = "cash" | "credit-card" | "debit-card" | "pix";

export const paymentMethods: Record<PaymentMethod, string> = {
  "cash": "Dinheiro",
  "credit-card": "Cartão de Crédito",
  "debit-card": "Cartão de Débito",
  "pix": "PIX",
};
