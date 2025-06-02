"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { removeCookie, setCookie } from "@/app/actions";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

const ID_TOKEN_COOKIE = "token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const token = await firebaseUser.getIdToken();
          await setCookie(token, ID_TOKEN_COOKIE);
          console.log("ID Token cookie set/updated.");
        } catch (error) {
          console.error("Error getting ID token:", error);
          setUser(null);
          removeCookie(ID_TOKEN_COOKIE);
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

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email: string) {
    console.log("xxx");

    await sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
