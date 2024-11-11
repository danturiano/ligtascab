import { auth } from "./app/(authentication)/_lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname === "/dashboard") {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (
    req.auth &&
    (req.nextUrl.pathname === "/sign-in" ||
      req.nextUrl.pathname === "/sign-up" ||
      req.nextUrl.pathname === "/")
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
