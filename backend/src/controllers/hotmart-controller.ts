import { Request, Response, Express, Router } from "express";
import { CustomError } from "../utils/errors";
import * as userRepository from "../repositories/user-repository";
import Transaction from "../models/TransactionHotmart";
import * as permissionRepository from "../repositories/permission-repository";
import { CreateUser } from "../types/User";

/**
 * Process permissions for a user based on transaction status
 * @param user The user object
 * @param productId The product ID
 * @param isApproved Whether the transaction is approved
 * @param isRefunded Whether the transaction is refunded
 * @param warrantyDate The warranty date
 */
async function processPermissions(
  user: any,
  productId: string,
  isApproved: boolean,
  isRefunded: boolean,
  warrantyDate?: string
) {
  try {
    console.log(`[processPermissions] Processing permissions for user: ${user._id}, product: ${productId}`);
    console.log(`[processPermissions] Status: isApproved=${isApproved}, isRefunded=${isRefunded}`);

    // Check if permission already exists
    const existingPermission = await permissionRepository
      .findByUserIdAndProductId(user._id.toString(), productId)
      .catch((err) => {
        console.error(`[processPermissions] Error finding permission: ${err}`);
        return null;
      });

    // Always provide an expiresAt value - use warranty date if available, otherwise set to 1 year from now
    const expiresAt = warrantyDate ? new Date(warrantyDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    console.log(`[processPermissions] Permission expires at: ${expiresAt}`);

    if (isApproved) {
      if (existingPermission) {
        console.log(`[processPermissions] Updating existing permission: ${existingPermission._id}`);
        // Update existing permission
        existingPermission.access = true;
        if (expiresAt) {
          existingPermission.expiresAt = expiresAt;
        }
        // updatedAt will be automatically set by Mongoose
        await permissionRepository
          .update(existingPermission, existingPermission._id.toString())
          .catch((err) => {
            console.error(`[processPermissions] Error updating permission: ${err}`);
          });
        console.log(`[processPermissions] Permission updated successfully`);
      } else {
        console.log(`[processPermissions] Creating new permission for user: ${user._id}`);
        // Create new permission
        const permissionData = {
          userId: user._id.toString(),
          productId: productId,
          phoneNumber: user.phoneNumber || "",
          access: true,
          expiresAt: expiresAt, // Always include expiresAt
        };
        console.log(`[processPermissions] Permission data: ${JSON.stringify(permissionData)}`);

        await permissionRepository.create(permissionData).catch((err) => {
          console.error(`[processPermissions] Error creating permission: ${err}`);
        });
        console.log(`[processPermissions] Permission created successfully`);
      }
    } else if (isRefunded && existingPermission) {
      console.log(`[processPermissions] Revoking access for permission: ${existingPermission._id}`);
      existingPermission.access = false;
      // updatedAt will be automatically set by Mongoose
      await permissionRepository
        .update(existingPermission, existingPermission._id.toString())
        .catch((err) => {
          console.error(`[processPermissions] Error updating permission for refund: ${err}`);
        });
      console.log(`[processPermissions] Access revoked successfully`);
    }
  } catch (error) {
    console.error(`[processPermissions] Error processing permissions: ${error}`);
  }
}

/**
 * Finds a user based on the email
 * @param email User's email
 * @returns The user object or null if not found
 */
async function findUserByEmail(email: string) {
  try {
    console.log(`[findUserByEmail] Attempting to find user with email: ${email}`);
    // Try to find the user
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      console.log(`[findUserByEmail] Existing user found: ${existingUser._id}`);
      return existingUser;
    }
    console.log(`[findUserByEmail] User not found with email: ${email}`);
    return null;
  } catch (error) {
    console.error(`[findUserByEmail] Error finding user: ${error}`);
    throw error;
  }
}

/**
 * Creates a new user
 * @param email User's email
 * @param name User's name (optional)
 * @param phoneNumber User's phone number (optional)
 * @returns The newly created user object
 */
async function createUser(email: string, name?: string, phoneNumber?: string) {
  try {
    console.log(
      `[createUser] Creating new user with email: ${email}, name: ${
        name || "not provided"
      }`
    );

    const newUser: CreateUser = {
      email,
      name: name || email.split("@")[0], // Use part of email as name if not provided
      phoneNumber: phoneNumber || "",
    };

    await userRepository.create(newUser);
    console.log(`[createUser] New user created for email: ${email}`);

    // Return the newly created user
    const createdUser = await userRepository.findByEmail(email);
    console.log(`[createUser] Retrieved newly created user: ${createdUser?._id || "not found"}`);
    return createdUser;
  } catch (error) {
    console.error(`[createUser] Error creating user: ${error}`);
    throw error;
  }
}

export function hotmartController(server: Express) {
  const hotmartRouter = Router();

  hotmartRouter.post("/webhook", async (req: Request, res: Response) => {
    try {
      // Log the webhook payload for testing
      console.log("Hotmart Webhook received:", JSON.stringify(req.body, null, 2));

      // Extract relevant data from the webhook payload based on the actual structure
      const {
        data: {
          purchase: { transaction: transactionId, status, approved_date } = {},
          product: { id: productId, warranty_date } = {},
          buyer: {
            name: buyerFirstName,
            last_name: buyerLastName,
            email: buyerEmail,
            checkout_phone: buyerPhone,
          } = {},
        } = {},
        event,
      } = req.body || {};

      console.log(`[webhook] Extracted data:`);
      console.log(`- transactionId: ${transactionId}`);
      console.log(`- productId: ${productId}`);
      console.log(`- buyerEmail: ${buyerEmail}`);
      console.log(`- status: ${status}`);
      console.log(`- event: ${event}`);

      // Validate required fields
      if (!transactionId || !buyerEmail || productId === undefined) {
        console.error(
          `[webhook] Missing required fields. transactionId: ${transactionId}, buyerEmail: ${buyerEmail}, productId: ${productId}`
        );
        throw new CustomError("Invalid webhook payload: Missing required fields", 400);
      }

      console.log(`[webhook] All required fields present, proceeding with processing`);

      // Combine first and last name if available
      const fullName = buyerFirstName
        ? buyerLastName
          ? `${buyerFirstName} ${buyerLastName}`
          : buyerFirstName
        : undefined;
      console.log(`[webhook] Combined buyer name: ${fullName || "undefined"}`);

      // Extract phone number if available
      const phoneNumber = req.body?.data?.buyer?.checkout_phone || "";
      console.log(`[webhook] Extracted phone number: ${phoneNumber || "not available"}`);

      // Check if transaction already exists (idempotency)
      console.log(`[webhook] Checking if transaction already exists with ID: ${transactionId}`);
      const existingTransaction = await Transaction.findOne({
        hotmartTransactionId: transactionId,
      }).catch((err) => {
        console.error(`[webhook] Error finding transaction: ${err}`);
        return null;
      });

      if (existingTransaction) {
        console.log(`[webhook] Transaction already exists: ${existingTransaction._id}`);
        // If transaction exists but status has changed, update it
        if (existingTransaction.status !== status) {
          console.log(
            `[webhook] Updating transaction status from ${existingTransaction.status} to ${status}`
          );
          existingTransaction.status = status;

          // No additional fields to update

          await existingTransaction.save().catch((err) => {
            console.error(`[webhook] Error updating transaction status: ${err}`);
          });

          // Process permissions based on updated status
          // Check if user exists first
          console.log(`[webhook] Checking if user exists with email: ${buyerEmail}`);
          let user = await findUserByEmail(buyerEmail).catch((err) => {
            console.error(`[webhook] Error in findUserByEmail: ${err}`);
            return null;
          });
          console.log(`[webhook] User check result: ${user?._id || "null"}`);

          // Handle different event types
          const isApproved = status === "COMPLETED" || status === "APPROVED" || event === "PURCHASE_COMPLETE" || event === "PURCHASE_APPROVED";
          const isRefunded = status === "REFUNDED" || event === "PURCHASE_REFUNDED";
          console.log(`[webhook] Transaction status: isApproved=${isApproved}, isRefunded=${isRefunded}`);

          // Implement the new flow for status updates:
          if (user) {
            // If user exists, create/update permission directly
            console.log(`[webhook] User exists with ID: ${user._id}, updating permission`);
            await processPermissions(user, productId.toString(), isApproved, isRefunded, warranty_date);
          } else {
            // If user doesn't exist, create user first
            console.log(`[webhook] User doesn't exist, creating new user with email: ${buyerEmail}`);
            user = await createUser(buyerEmail, fullName, phoneNumber).catch((err) => {
              console.error(`[webhook] Error in createUser: ${err}`);
              return null;
            });
            
            if (user) {
              // Then create permission for the new user
              console.log(`[webhook] New user created with ID: ${user._id}, creating permission`);
              await processPermissions(user, productId.toString(), isApproved, isRefunded, warranty_date);
            }
          }
        }

        res.status(200).json({
          message: "Transaction already processed",
          transactionId: existingTransaction.hotmartTransactionId,
          status: existingTransaction.status,
        });
        return;
      }

      // Check if user exists first
      console.log(`[webhook] Checking if user exists with email: ${buyerEmail}`);
      let user = await findUserByEmail(buyerEmail).catch((err) => {
        console.error(`[webhook] Error in findUserByEmail: ${err}`);
        return null;
      });
      
      // Handle different event types
      const isApproved = status === "COMPLETED" || status === "APPROVED" || event === "PURCHASE_COMPLETE" || event === "PURCHASE_APPROVED";
      const isRefunded = status === "REFUNDED" || event === "PURCHASE_REFUNDED";
      console.log(`[webhook] Transaction status: isApproved=${isApproved}, isRefunded=${isRefunded}`);

      // Create transaction record first
      console.log(`[webhook] Creating new transaction record for ID: ${transactionId}`);
      try {
        const transactionData = {
          hotmartTransactionId: transactionId,
          productId: productId.toString(),
          customerEmail: buyerEmail,
          status: status || "pending",
        };
        console.log(`[webhook] Transaction data: ${JSON.stringify(transactionData)}`);

        // Use findOneAndUpdate with upsert to handle potential duplicate key errors
        const newTransaction = await Transaction.findOneAndUpdate(
          { hotmartTransactionId: transactionId },
          transactionData,
          { upsert: true, new: true }
        );

        console.log(`[webhook] Transaction created/updated successfully: ${newTransaction._id}`);
        
        // Implement the new flow:
        if (user) {
          // If user exists, create permission directly
          console.log(`[webhook] User exists with ID: ${user._id}, creating permission`);
          await processPermissions(user, productId.toString(), isApproved, isRefunded, warranty_date);
        } else {
          // If user doesn't exist, create user first
          console.log(`[webhook] User doesn't exist, creating new user with email: ${buyerEmail}`);
          user = await createUser(buyerEmail, fullName, phoneNumber).catch((err) => {
            console.error(`[webhook] Error in createUser: ${err}`);
            return null;
          });
          
          if (!user) {
            console.error(`[webhook] Failed to create user with email: ${buyerEmail}`);
            res.status(500).json({ error: "Failed to create user" });
            return;
          }
          
          // Then create permission for the new user
          console.log(`[webhook] New user created with ID: ${user._id}, creating permission`);
          await processPermissions(user, productId.toString(), isApproved, isRefunded, warranty_date);
        }

        res.status(200).json({
          message: "Webhook processed successfully",
          transactionId: transactionId,
          userId: user._id,
          event: event,
          status: status,
        });
        return;
      } catch (error) {
        console.error(`[webhook] Error processing transaction: ${error}`);

        // Check if it's a duplicate key error
        const errorObj = error as Error;
        if (errorObj.message && errorObj.message.includes("duplicate key")) {
          console.log(`[webhook] Duplicate transaction detected, updating status if needed`);

          // Find the existing transaction
          const existingTransaction = await Transaction.findOne({ hotmartTransactionId: transactionId });
          if (existingTransaction && existingTransaction.status !== status) {
            existingTransaction.status = status;
            await existingTransaction.save();
            console.log(`[webhook] Updated transaction status to: ${status}`);
          }

          // Implement the new flow for duplicate key errors:
          if (user) {
            // If user exists, create/update permission directly
            console.log(`[webhook] User exists with ID: ${user._id}, updating permission for duplicate key error`);
            await processPermissions(user, productId.toString(), isApproved, isRefunded, warranty_date);
          } else {
            console.error(`[webhook] No user found for duplicate key error handling`);
          }

          res.status(200).json({
            message: "Transaction already exists, status updated",
            transactionId: transactionId,
            status: status,
          });
          return;
        }

        res.status(500).json({
          error: "Error processing transaction",
          details: errorObj.message || "Unknown error",
        });
        return;
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      console.error("Error processing Hotmart webhook:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.use("/api/hotmart", hotmartRouter);
}
