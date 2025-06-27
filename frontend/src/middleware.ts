import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", whenAutenticated: "redirect" },
  { path: "/register", whenAutenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export async function middleware(req: NextRequest) {
  // const path = req.nextUrl.pathname;
  // const isPublicRoute = publicRoutes.find((route) => route.path === path);

  // const authToken = req.cookies.get("token")?.value;
  // console.log(authToken);

  // if (!authToken && isPublicRoute) {
  //   return NextResponse.next();
  // }

  // if (!authToken && !isPublicRoute) {
  //   const redirectUrl = req.nextUrl.clone();

  //   redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

  //   return NextResponse.redirect(redirectUrl);
  // }

  // if (authToken && isPublicRoute && isPublicRoute.whenAutenticated === "redirect") {
  //   const redirectUrl = req.nextUrl.clone();

  //   redirectUrl.pathname = "/dashboard";

  //   return NextResponse.redirect(redirectUrl);
  // }

  // if (authToken && !isPublicRoute) {
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

// Continuar cadastrando as rotas públicas e privadas
// Achar um jeito de fazer isso dinamicamente
// Implementar as funcções de autenticação aqui no front para intergrar com o backend
// Subir as alterações pro github
