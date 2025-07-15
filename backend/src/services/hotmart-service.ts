// import * as userRepository from "../repositories/user-repository";
// import * as permissionRepository from "../repositories/permission-repository";
// import Transaction from "../models/TransactionHotmart";
// import * as hotmartRepository from "../repositories/hotmart-repository";
// import { TransactionHotmartDto } from "../dto/transaction-hotmart";
// import { CreateUserType } from "../schemas/user-schema";

// /**
//  * Finds or creates a user based on the email
//  * @param email User's email
//  * @param name User's name (optional)
//  * @param phoneNumber User's phone number (optional)
//  * @returns The user object
//  */
// export async function findOrCreateUser(email: string, name?: string, phoneNumber?: string) {
//   try {
//     // Try to find the user first
//     const existingUser = await userRepository.findByEmail(email);
//     if (existingUser) {
//       return existingUser;
//     }

//     const newUser: CreateUserType = {
//       email,
//       name: name || email.split("@")[0], // Use part of email as name if not provided
//       phoneNumber: phoneNumber || "", // Empty string if not provided
//       password: "",
//     };

//     await userRepository.create(newUser);

//     // Return the newly created user
//     return await userRepository.findByEmail(email);
//   } catch (error) {
//     throw error;
//   }
// }

// /**
//  * Processes a Hotmart transaction and creates/updates user and permissions
//  * @param transactionData The transaction data from Hotmart webhook
//  * @returns The created transaction
//  */
// export async function processHotmartTransaction(transactionData: {
//   email: string;
//   transactionId: string;
//   productId: string;
//   status: string;
//   startDate: Date;
//   endDate: Date;
//   permissions: string[];
//   name?: string;
//   phoneNumber?: string;
// }) {
//   try {
//     // Check if transaction already exists (idempotency)
//     const existingTransaction = await Transaction.findOne({
//       transactionId: transactionData.transactionId,
//     });

//     if (existingTransaction) {
//       // If transaction exists but status has changed, update it
//       if (existingTransaction.status !== transactionData.status) {
//         existingTransaction.status = transactionData.status;
//         // No need to set updatedAt as it's not in the model
//         await existingTransaction.save();
//       }
//       return existingTransaction;
//     }

//     // Find or create user
//     const user = await findOrCreateUser(
//       transactionData.email,
//       transactionData.name,
//       transactionData.phoneNumber
//     );

//     // Create transaction record
//     // Only include fields that exist in the Transaction model
//     const transaction = await createTransactionHotmart({
//       customerEmail: transactionData.email, // Field name is customerEmail in the model
//       hotmartTransactionId: transactionData.transactionId, // Field name is hotmartTransactionId in the model
//       productId: transactionData.productId,
//       status: transactionData.status,
//       // startDate, endDate, and permissions are not in the Transaction model
//     });

//     // Create or update permissions based on transaction
//     if (user && transaction.status === "completed") {
//       // Check if permission already exists
//       const existingPermission = await permissionRepository.findByUserIdAndProductId(
//         user._id.toString(),
//         transaction.productId
//       );

//       // Use the endDate from the transaction data since it's not in the Transaction model
//       const expiresAt = transactionData.endDate;

//       if (existingPermission) {
//         // Update existing permission
//         existingPermission.access = true;
//         existingPermission.expiresAt = expiresAt;
//         // updatedAt will be automatically set by Mongoose
//         await permissionRepository.update(existingPermission, existingPermission._id.toString());
//       } else {
//         // Create new permission
//         await permissionRepository.create({
//           userId: user._id.toString(),
//           productId: transaction.productId,
//           phoneNumber: user.phoneNumber || "",
//           access: true,
//           expiresAt,
//         });
//       }
//     }

//     return transaction;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function createTransactionHotmart(data: TransactionHotmartDto) {
//   try {
//     return await hotmartRepository.create(data);
//   } catch (error) {
//     throw error;
//   }
// }
