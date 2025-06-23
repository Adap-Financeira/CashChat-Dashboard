export type PaymentMethod = "cash" | "credit" | "debit" | "pix" | "vr" | "va" | "paypal";

export const paymentMethods: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  credit: "Crédito",
  debit: "Débito",
  pix: "Pix",
  vr: "VR",
  va: "VA",
  paypal: "PayPal",
};

export function getPaymentMethodKeyByLabel(label: string): PaymentMethod | undefined {
  const entry = Object.entries(paymentMethods).find(
    ([_, value]) => value.toLowerCase() === label.toLowerCase()
  );
  return entry?.[0] as PaymentMethod | undefined;
}
