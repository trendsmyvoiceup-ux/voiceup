import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.STUDIO_SECRET;

export function middleware(req: NextRequest) {
  // No secret set = dev mode, pass through
  if (!SECRET) return NextResponse.next();

  const token =
    req.cookies.get("studio-token")?.value ??
    req.nextUrl.searchParams.get("token");

  if (token === SECRET) return NextResponse.next();

  // API routes → 401
  if (req.nextUrl.pathname.startsWith("/api/studio")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Studio login page itself → pass through to avoid redirect loop
  if (req.nextUrl.pathname === "/studio/login") return NextResponse.next();

  // Everything else under /studio → redirect to login
  const url = req.nextUrl.clone();
  url.pathname = "/studio/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/studio/:path*", "/api/studio/:path*"],
};
