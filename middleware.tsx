import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userInfo = request.cookies.get("userInfo")?.value;

  const userRole = userInfo ? JSON.parse(userInfo).role : null;

  const restrictedRoutes = [
    "/admin",
    "/admin/dashboard",
    "/admin/dashboard/product-list",
    "/admin/management",
    "/admin/dashboard/orders",
  ];

  const isRestrictedRoute = restrictedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (userRole === "USER" && isRestrictedRoute) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  const protectedRoutes = ["/Shop/checkout", "/payment"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Shop/checkout/:path*", "/payment/:path*", "/admin/:path*"],
};
