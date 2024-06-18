import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // reurn NextResponse.redirect(new URL("/Login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/:path*"],
};
