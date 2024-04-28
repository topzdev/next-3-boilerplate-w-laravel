import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/auth-only'];
const authRoutes = ['/login', '/register', '/guest-only'];
const publicRoutes = ['/', '/about']
export const loginRoute = '/login';
export const homeRoute = '/';
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;
        const isAuthenticated = !!token;
        const isAuthRoute = authRoutes.includes(pathname);
        const isProtectedRoute = protectedRoutes.includes(pathname);
        const isPublicRoute = publicRoutes.includes(pathname);


        if (isProtectedRoute && !isAuthenticated) {
            return  NextResponse.redirect(new URL(loginRoute, req.nextUrl));
        }

        if (isAuthRoute && isAuthenticated) {
            return NextResponse.redirect(new URL(homeRoute, req.nextUrl));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => true,
        },
    },
)

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}