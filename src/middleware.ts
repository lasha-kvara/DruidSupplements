import { NextResponse, type NextRequest } from "next/server";

/**
 * Georgian is served at the root without a prefix ("/catalog"),
 * English under "/en" ("/en/catalog"). Internally every page lives in app/[lang]/.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const url = request.nextUrl.clone();

  // "/ka/..." is never a public URL — redirect to the canonical unprefixed path.
  if (pathname === "/ka" || pathname.startsWith("/ka/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/ka${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and files with an extension (images, icon.svg, sitemap.xml...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
