import createMiddleware from "next-intl/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// i18n routing configuration
const routing = {
  locales: ["en", "da"],
  defaultLocale: "en",
  localeDetection: true, // Enable automatic locale detection
  localePrefix: "always" // Add this line to ensure locale is always in URL
};


export async function middleware(req) {
  const res = NextResponse.next();

  // Initialize Supabase middleware for authentication
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define paths that require authentication
  const protectedPaths = ["/api/llm", "/api/chat", "/api/settings"];
  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api")) {
    return NextResponse.rewrite(new URL(pathname, req.url));
  }
  // If the request is for a protected route and user is not authenticated, return 401 Unauthorized
  if (isProtectedRoute && !user) {
    return NextResponse.json({ message: "Auth required!" }, { status: 401 });
  }

  // Initialize i18n middleware for internationalized routing
  const i18nMiddleware = createMiddleware(routing);
  const i18nResponse = i18nMiddleware(req);

  // If i18n middleware handles the request (like redirecting to default locale), return that response
  if (i18nResponse) {
    return i18nResponse;
  }
  res.cookies.set("current-pathname", req.nextUrl.pathname);

  // If the user is authenticated or the route is public, continue with the response
  return res;
}

export const config = {
  matcher: [
    "/", // Home route for i18n
    "/(da|en)/:path*", // Routes with locales for i18n
    "/api/llm", // Supabase protected routes
    "/api/chat",
    "/api/settings",
  ],
};
