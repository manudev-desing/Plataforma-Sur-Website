import { NextRequest, NextResponse } from "next/server";
import { securityFacade } from "./facades/security-facade";

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const userAgent = request.headers.get("user-agent");

  const verdict = securityFacade.inspectIncomingRequest({
    ip,
    userAgent,
    path: request.nextUrl.pathname,
    headers: {
      "accept-language": request.headers.get("accept-language") ?? undefined,
    },
  });

  if (!verdict.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: "Access Denied",
        status: verdict.statusCode,
      }),
      {
        status: verdict.statusCode,
        headers: {
          "Content-Type": "application/json",
          ...verdict.headers,
        },
      }
    );
  }

  const response = NextResponse.next();

  for (const [key, value] of Object.entries(verdict.headers)) {
    response.headers.set(key, value);
  }

  // Strip identifying headers
  response.headers.delete("x-powered-by");
  response.headers.delete("server");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.png).*)",
  ],
};
