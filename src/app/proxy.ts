import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'auth-token';

const publicRoutes = ['/', '/login', '/register'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/api/')
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isProtectedRoute = pathname.startsWith('/dashboard');

  if (isProtectedRoute) {
    const authToken = request.cookies.get(AUTH_COOKIE_NAME);

    if (!authToken?.value) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
