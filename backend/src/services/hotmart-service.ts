import mongoose from "mongoose";
import { isWithinLast32Days } from "../utils/date";
import { CustomError } from "../utils/errors";
import * as permissionService from "../services/permission-services";
import * as userService from "../services/user-service";

const HOTMART_API_URL = "https://developers.hotmart.com/payments/api/v1";
const HOTMART_ACCESS_TOKEN_BASE_URL = "https://api-sec-vlc.hotmart.com/security/oauth/token";

export async function getHotmartAccessToken(): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
} | null> {
  try {
    const response = await fetch(
      `${HOTMART_ACCESS_TOKEN_BASE_URL}?grant_type=client_credentials&client_id=${process.env.HOTMART_CLIENT_ID}&client_secret=${process.env.HOTMART_CLIENT_SECRET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.HOTMART_BASIC_TOKEN}`,
        },
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getHotmartTransaction(id: string, accessToken: string) {
  try {
    const response = await fetch(`${HOTMART_API_URL}/sales/history?transaction=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function validateTransaction(id: string) {
  try {
    const accessToken = await getHotmartAccessToken();

    if (!accessToken) {
      throw new CustomError("Erro ao obter o token de acesso", 500);
    }

    const transaction = await getHotmartTransaction(id, accessToken.access_token);

    console.log("productId:", transaction.items[0].product.id);

    if (!transaction) {
      throw new CustomError("Erro ao obter a transação", 500);
    }

    // Check if the transaction is approved (APPROVED or COMPLETED)
    if (
      transaction.items[0].purchase.status !== "APPROVED" &&
      transaction.items[0].purchase.status !== "COMPLETED"
    ) {
      throw new CustomError("Transação não aprovada", 400);
    }

    // Check if the approved date is within the last 32 days
    if (!isWithinLast32Days(transaction.items[0].purchase.approved_date)) {
      throw new CustomError("Só é possível validar transações de no máximo 32 dias atrás.", 400);
    }

    return transaction;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function activateNewSubscription(email: string, productId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();

  // Check if the product id is one of the our two plans
  const expiresAt =
    productId === "5591669" // Monthly plan
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : productId === "5564137" // Annual plan
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 365 days
      : null;

  if (!expiresAt) {
    throw new CustomError("Produto inválido", 400);
  }

  try {
    const user = await userService.findUserByEmail(email);
    // Create dashboard permission
    await permissionService.createOrUpdatePermission(
      {
        userId: user._id.toString(),
        productId: "dashboard",
        phoneNumber: user.phoneNumber,
        access: true,
        expiresAt,
      },
      session
    );

    // Create chatbot permission
    await permissionService.createOrUpdatePermission(
      {
        userId: user._id.toString(),
        productId: "chatbot",
        phoneNumber: user.phoneNumber,
        access: true,
        expiresAt,
      },
      session
    );

    // Create categories permission
    await permissionService.createOrUpdatePermission(
      {
        userId: user._id.toString(),
        productId: "categories",
        phoneNumber: user.phoneNumber,
        access: true,
        expiresAt,
      },
      session
    );

    await session.commitTransaction();
    session.endSession();
    return true;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
