import createMiddleware from "next-intl/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// i18n routing configuration
const routing = {
  locales: ["en", "da"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "always"
};

export async function middleware(req) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  
  console.log('Middleware called for path:', pathname);
  
  // API route handling needs to come first
  if (pathname.startsWith("/api")) {
    // Initialize Supabase middleware for authentication
    const supabase = createMiddlewareClient({ req, res });
    const { data: { user } } = await supabase.auth.getUser();
    
    // Define paths that require authentication
    const protectedPaths = ["/api/llm", "/api/chat", "/api/settings"];
const isProtectedRoute = protectedPaths.some(path => {
  // Exact path match
  if (pathname === path) return true;
  
  // Sub-path match but exclude specific exceptions
  if (pathname.startsWith(`${path}/`)) {
    // Exclude specific paths that don't need protection
    if (path === "/api/llm" && pathname === "/api/llm/preview") {
      return false;
    }
    return true;
  }
  
  return false;
});
    console.log('API route check:', {
      path: pathname,
      isProtected: isProtectedRoute,
      hasUser: !!user
    });
    
    // Check authentication for API routes
    if (isProtectedRoute && !user) {
      console.log('Auth required - returning 401');
      return NextResponse.json({ message: "Auth required!" }, { status: 401 });
    }
    
    // Continue with API request
    return NextResponse.rewrite(new URL(pathname, req.url));
  }
  
  // For non-API routes, handle i18n routing
  const i18nMiddleware = createMiddleware(routing);
  const i18nResponse = i18nMiddleware(req);
  
  if (i18nResponse) {
    return i18nResponse;
  }
  
  res.cookies.set("current-pathname", req.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: [
    "/", 
    "/(da|en)/:path*", 
    "/api/llm/:path*", // Note the addition of :path*
    "/api/chat/:path*",
    "/api/settings/:path*",
    "/api/llm",        // Keep the exact routes too
    "/api/chat",
    "/api/settings",
  ],
};
