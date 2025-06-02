"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only attempt to redirect if not loading and user exists
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]); // Dependencies for the effect

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  // If there's a user (and we're not loading, which is handled above),
  // it means we are in the process of redirecting (or will be shortly by useEffect).
  // So, don't render the children. Render null or a "Redirecting..." message.
  if (user) {
    // You can return a "Redirecting..." message or simply null
    // return <div>Redirecionando para o dashboard...</div>;
    return null;
  }

  // Only if not loading AND no user, render the public children
  return <>{children}</>;
}
