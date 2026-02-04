import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

  const pathname = req.nextUrl.pathname;

  // Always redirect / to /dashboard
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }
const token = await getToken({
  req,
  secret: process.env.NEXTAUTH_SECRET,
  secureCookie: process.env.NODE_ENV === "production",
});


  const isLoggedIn = !!token;

  const protectedRoutes = [
    "/resume",
    "/interview",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Protected route → login required
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/resume/:path*",
    "/interview/:path*",
    "/login",
    "/register",
  ],
};
