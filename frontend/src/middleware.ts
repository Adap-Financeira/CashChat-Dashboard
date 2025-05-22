import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = (await cookies()).get("token")?.value;

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Continuar cadastrando as rotas públicas e privadas
// Achar um jeito de fazer isso dinamicamente
// Implementar as funcções de autenticação aqui no front para intergrar com o backend
// Subir as alterações pro github
