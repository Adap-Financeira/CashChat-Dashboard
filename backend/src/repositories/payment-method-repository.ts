import PaymentMethods from "../models/PaymentMethods";

export async function getPaymentMethods() {
  return await PaymentMethods.find().lean<{ _id: string; type: string }[]>();
}

export async function getById(id: string) {
  return await PaymentMethods.findById(id).lean<{ _id: string; type: string }>();
}
