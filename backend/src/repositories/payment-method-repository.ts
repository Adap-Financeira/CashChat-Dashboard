import PaymentMethods from "../models/PaymentMethods";

export async function getPaymentMethods() {
  return await PaymentMethods.find().lean<{ _id: string; type: string }[]>();
}
