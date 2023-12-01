import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.level !== "ADMIN") {
            return NextResponse.redirect(new URL("/auth/error?error=Access Denied", req.url))
        }

        if ((req.nextUrl.pathname.startsWith("/profile") || req.nextUrl.pathname.startsWith("/jobs") || req.nextUrl.pathname.startsWith("/my-jobs")) && req.nextauth.token?.status === "NEW") {
            return NextResponse.redirect(new URL("/onboarding", req.url))
        }

        if ((req.nextUrl.pathname.startsWith("/profile") || req.nextUrl.pathname.startsWith("/jobs") || req.nextUrl.pathname.startsWith("/my-jobs"))
            && (req.nextauth.token?.status === "SUBMIT" || req.nextauth.token?.status === "REJECTED")) {
            return NextResponse.redirect(new URL("/status", req.url))
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = { matcher: ["/admin/:path*", "/jobs/:path*", "/my-jobs/:path*", "/onboarding", "/profile"] }