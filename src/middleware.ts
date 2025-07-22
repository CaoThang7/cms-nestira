import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  
  // Check if the request is for the /auth/signin page
  const isSigninPage = request.nextUrl.pathname === '/signin';
  
  // If token exists and trying to access the signin page, redirect to another page
  if (token && isSigninPage) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage or another page
  }
  
  // Check if token exists in cookies for other pages
  if (!token) {
    // If there is no token and the user is not trying to access /auth/signin
    // redirect to /auth/signin for protected pages
    if (!isSigninPage) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  
  // For all other requests, just proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/profile",
    "/category",
    "/category/:path*",
    "/create-category",
    "/update-category",
    "/update-category/:path*",
    "/list-for-category",
    "/list-for-category/:path*",
    "/product",
    "/product/:path*",
    "/create-product",
    "/update-product",
    "/update-product/:path*",
    "/list-for-product",
    "/list-for-product/:path*",
    "/detail-product",
    "/detail-product/:path*",
    "/trash-category",
    "/trash-category/:path*",
    "/trash-product",
    "/trash-product/:path*",
    "/list-for-order",
    "/list-for-order/:path*",
    "/detail-order",
    "/detail-order/:path*",
    "/update-order",
    "/update-order/:path*",
    "/promotion",
    "/promotion/:path*",
    "/create-promotion",
    "/update-promotion",
    "/update-promotion/:path*",
    "/list-for-promotion",
    "/list-for-promotion/:path*",
    "/detail-promotion",
    "/detail-promotion/:path*",
  ],
};