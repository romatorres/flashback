
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const userRole = session.user?.role;
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (userRole !== "ADMIN" && userRole !== "EDITOR") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
