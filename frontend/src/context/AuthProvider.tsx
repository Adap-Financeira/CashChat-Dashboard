"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
  UserCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { removeCookie, setCookie } from "@/app/actions";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  deleteAccount: (user: User) => Promise<void>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  deleteAccount: async () => {},
  createUser: async () => {
    throw new Error("createUser not implemented");
  },
});

export const ID_TOKEN_COOKIE = "token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setUser(firebaseUser);
          await setCookie(token, ID_TOKEN_COOKIE);
          console.log("ID Token cookie set/updated.");
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      } else {
        setUser(null);
        removeCookie(ID_TOKEN_COOKIE);
        console.log("User signed out, ID Token cookie removed.");
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(async () => {
      try {
        const token = await user.getIdToken(true); // force refresh
        await setCookie(token, ID_TOKEN_COOKIE);
        console.log("ID token refreshed and cookie updated.");
      } catch (error) {
        console.error("Error refreshing ID token:", error);
      }
    }, 50 * 60 * 1000); // every 50 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  async function createUser(email: string, password: string) {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await signOut(auth);
    return userCredentials;
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  async function deleteAccount(user: User) {
    await deleteUser(user);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, resetPassword, createUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
