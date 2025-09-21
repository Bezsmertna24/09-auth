import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PRIVATE_ROUTES = [
  "/profile",
  "/profile/edit",
  "/notes",
  "/notes/action/create",
];


const PUBLIC_ROUTES = [
  "/sign-in",
  "/sign-up",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;


  if (token) {

    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
      const url = request.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }


  if (!token && PRIVATE_ROUTES.some(route => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in"; 
    return NextResponse.redirect(url);
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
