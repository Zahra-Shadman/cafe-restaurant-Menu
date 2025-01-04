import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const protectedRoutes = ["/Shop/checkout", "/Shop/checkout/payment"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !accessToken) {
    
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Shop/checkout/:path*", "/Shop/checkout/payment/:path*"],
};
