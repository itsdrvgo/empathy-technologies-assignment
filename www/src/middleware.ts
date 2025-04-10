import { NextRequest, NextResponse } from "next/server";
import { IG_ACCESS_TOKEN_COOKIE, IG_EXPIRES_IN_COOKIE } from "./config/const";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isAuthRoute = path.startsWith("/auth");

    const accessToken = req.cookies.get(IG_ACCESS_TOKEN_COOKIE)?.value;
    const expiresIn = req.cookies.get(IG_EXPIRES_IN_COOKIE)?.value;

    const isLoggedIn = !!accessToken && !!expiresIn;

    const isInconsistentState =
        (!!accessToken && !expiresIn) || (!accessToken && !!expiresIn);

    if (isInconsistentState) {
        const response = NextResponse.redirect(new URL("/auth", req.url));
        response.cookies.delete(IG_ACCESS_TOKEN_COOKIE);
        response.cookies.delete(IG_EXPIRES_IN_COOKIE);
        return response;
    }

    if (!isLoggedIn && !isAuthRoute) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
