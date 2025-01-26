import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userInfo = request.cookies.get("userInfo")?.value;

  let userRole: string | null = null;
  if (userInfo) {
    try {
      userRole = JSON.parse(userInfo).role;
    } catch (error) {
      console.error("Failed to parse userInfo:", error);
    }
  }

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

  if (!accessToken || userRole === "USER") {
    if (isRestrictedRoute) {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  const protectedRoutes = ["/Shop/checkout", "/payment"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Shop/checkout/:path*", "/payment/:path*", "/admin/:path*"],
};
