import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const pathname = req.nextUrl.pathname;

  // Private routes (login required)
  const protectedRoutes = [
    "/resume",
    "/interview",
  ];

  // Check if current path is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Agar login nahi aur private page open kar raha
  if (!isLoggedIn && isProtected) {
    const loginUrl = new URL("/login", req.url);

    // Save where user wanted to go
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Agar login hai aur login/register pe ja raha
  if (
    isLoggedIn &&
    (pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: [
    "/resume/:path*",
    "/interview/:path*",
    "/login",
    "/register",
  ],
};
