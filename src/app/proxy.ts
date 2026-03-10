import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'auth-token';
const ADMIN_AUTH_COOKIE_NAME = 'admin-auth-token';

const publicRoutes = ['/', '/login', '/register', '/admin/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/api/')
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isClientProtectedRoute = pathname.startsWith('/dashboard');
  const isAdminProtectedRoute = pathname.startsWith('/admin/dashboard');

  if (isClientProtectedRoute) {
    const authToken = request.cookies.get(AUTH_COOKIE_NAME);

    if (!authToken?.value) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isAdminProtectedRoute) {
    const adminAuthToken = request.cookies.get(ADMIN_AUTH_COOKIE_NAME);

    if (!adminAuthToken?.value) {
      const adminLoginUrl = new URL('/admin/login', request.url);
      adminLoginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(adminLoginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
