import * as paymentMethodRepository from "../repositories/payment-method-repository";
import { CustomError } from "../utils/errors";

export async function getPaymentMethods() {
  try {
    const paymentMethods = await paymentMethodRepository.getPaymentMethods();

    if (!paymentMethods) {
      throw new CustomError("Métodos de pagamento não encontrados.", 404);
    }

    return paymentMethods;
  } catch (error) {
    throw error;
  }
}

export async function getPaymentMethodById(id: string) {
  try {
    const paymentMethod = await paymentMethodRepository.getById(id);

    if (!paymentMethod) {
      throw new CustomError("Método de pagamento não encontrado.", 404);
    }

    return paymentMethod;
  } catch (error) {
    throw error;
  }
}
