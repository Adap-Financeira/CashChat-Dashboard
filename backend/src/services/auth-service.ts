import * as userService from "../services/user-service";
import * as permissionService from "../services/permission-services";
import * as categoryService from "../services/category-services";
import * as zapierService from "../services/zapier-service";
import { CustomError } from "../utils/errors";
import { CreateUserType } from "../schemas/user-schema";
import admin from "../lib/firebase-admin";
import mongoose from "mongoose";

export async function loginDashboard(email: string) {
  try {
    const user = await userService.findUserByEmail(email);

    // Check if user already has a firebase id
    if (!user.firebaseId) {
      throw new CustomError("Este email não tem uma conta dashboard vinculada.", 401);
    }

    // Check if permissions are valid
    const userPermission = await permissionService.findPermissionByUserIdAndProductId(
      user._id.toString(),
      "dashboard"
    );

    // Check if user has permission to access the dashboard
    if (!userPermission?.access) {
      throw new CustomError("Este email não tem permissão para acessar o dashboard.", 401);
    }

    // Check if this permission in expired
    if (userPermission.expiresAt && userPermission.expiresAt < new Date()) {
      throw new CustomError("Sua permissão de acesso ao dashboard expirou.", 401);
    }
  } catch (error) {
    throw error;
  }
}

// Set the firebase id to a user in mongodb with email
export async function linkAccount(email: string, firebaseId: string) {
  try {
    // Check if the user exists in mongodb
    const user = await userService.findUserByEmail(email);

    // Check if user is not null
    if (!user) {
      throw new CustomError("Este email não tem permissão para criar conta.", 401);
    }

    // Check if this user has permission to access the dashboard
    // Using userId and dashboard product id to find permission
    const userPermission = await permissionService.findPermissionByUserIdAndProductId(
      user._id.toString(),
      "dashboard"
    );
    if (!userPermission?.access) {
      throw new CustomError("Este email não tem permissão para criar conta no dashboard.", 401);
    }

    // Check if this permission in expired
    if (userPermission.expiresAt && userPermission.expiresAt < new Date()) {
      throw new CustomError("A permissão para acessar o dashboard expirou.", 401);
    }

    const updatedUser = await userService.update(email, { firebaseId });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Create a new user in dashboard with permissions
// By default, the user has permissions to access dashboard, chatbot and create categories
// Free trial = 7 days | 1 week
export async function registerDashboard(data: CreateUserType) {
  const session = await mongoose.startSession();
  session.startTransaction();

  let newUser: any | null = null;
  let shouldCreateCategories: boolean = true;

  let firebaseUser: admin.auth.UserRecord | null = null;
  try {
    // Check if email is already in use
    await userService.checkEmailAvailability(data.email);

    // Check if the phone number is already in use
    // This is returning the user because when the dashboard is not released, the user
    // could already have an account without name, email, firebaseId, etc.
    // In this case, the user was already registered with only the phone number.
    const previousUser = await userService.checkPhoneNumberAvailability(data.phoneNumber);

    // Create the user in firebase
    firebaseUser = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.name,
    });

    // If the user was already registered with only the phone number, update the user
    if (previousUser) {
      newUser = await userService.updateById(previousUser._id.toString(), {
        ...data,
        firebaseId: firebaseUser.uid,
        password: "",
      });
      shouldCreateCategories = false;
    } else {
      // If the user was not registered, create a new user
      newUser = await userService.createUser(
        {
          ...data,
          firebaseId: firebaseUser.uid,
          password: "",
        },
        session
      );
    }

    // Create the permissions for the user

    // Create dashboard permission
    await permissionService.createOrUpdatePermission(
      {
        userId: newUser._id.toString(),
        productId: "dashboard",
        phoneNumber: data.phoneNumber,
        access: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
      session
    );

    // Create chatbot permission
    await permissionService.createOrUpdatePermission(
      {
        userId: newUser._id.toString(),
        productId: "chatbot",
        phoneNumber: data.phoneNumber,
        access: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
      session
    );

    // Create categories permission
    await permissionService.createOrUpdatePermission(
      {
        userId: newUser._id.toString(),
        productId: "categories",
        phoneNumber: data.phoneNumber,
        access: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
      session
    );

    // Create user default categories
    //gastos fixos, lazer, investimento, conhecimento, doação
    if (shouldCreateCategories) {
      await categoryService.createManyCategoriesWithId(
        newUser._id.toString(),
        [
          {
            name: "Gastos fixos",
            color: "#FF0000",
          },
          {
            name: "Lazer",
            color: "#0000FF",
          },
          {
            name: "Investimento",
            color: "#00FF00",
          },
          {
            name: "Conhecimento",
            color: "#FFFF00",
          },
          {
            name: "Doação",
            color: "#4B0082",
          },
        ],
        session
      );
    }

    // Send user information to Zapier
    await zapierService.sendUserInformationToZapier(newUser.email, newUser.name, newUser.phoneNumber);

    await session.commitTransaction();
    session.endSession();

    return newUser;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();

    // Delete the user in firebase
    if (firebaseUser?.uid) {
      try {
        await admin.auth().deleteUser(firebaseUser.uid);
      } catch (cleanupError) {
        console.error("Failed to rollback Firebase user:", cleanupError);
      }
    }

    throw error;
  } finally {
    session.endSession();
  }
}

// Depracated
// export async function login(email: string) {
//   try {
//     const user = await userRepository.findByEmail(email);
//     if (!user) {
//       throw new CustomError("Usuário não encontrado.", 404);
//     }

//     //Check if user has permission to access the dashboard
//     const permission = await permissionRepository.findByUserIdAndProductId(
//       user._id.toString(),
//       productsIds.Dashboard
//     );
//     if (!permission?.access) {
//       throw new CustomError("Usuário sem acesso a plataforma dashboard.", 401);
//     }

//     const payload = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//     };

//     const token = jwt.sign({ ...payload }, process.env.JWT_SECRET!, { expiresIn: "1d" });

//     return {
//       token,
//     };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
