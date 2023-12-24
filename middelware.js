import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

/**
 * Verify if there is an authenticated Supabase user
Validate if the user is authenticated and currently on the sign-in page, redirecting them to the account page
Verify if the user is not authenticated and currently on the account page, redirecting them to the sign-in page.
 */

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).)*"],
};
