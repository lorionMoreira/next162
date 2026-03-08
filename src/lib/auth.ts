import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'auth-token';
const ADMIN_AUTH_COOKIE_NAME = 'admin-auth-token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthUser {
  username: string;
  isAdmin?: boolean;
}

export async function setAuthCookie(token: string, isAdmin: boolean = false): Promise<void> {
  const cookieStore = await cookies();
  const cookieName = isAdmin ? ADMIN_AUTH_COOKIE_NAME : AUTH_COOKIE_NAME;
  
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function getAuthToken(isAdmin: boolean = false): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieName = isAdmin ? ADMIN_AUTH_COOKIE_NAME : AUTH_COOKIE_NAME;
  const cookie = cookieStore.get(cookieName);
  return cookie?.value || null;
}

export async function clearAuthCookie(isAdmin: boolean = false): Promise<void> {
  const cookieStore = await cookies();
  const cookieName = isAdmin ? ADMIN_AUTH_COOKIE_NAME : AUTH_COOKIE_NAME;
  cookieStore.delete(cookieName);
}

export async function clearAllAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete(ADMIN_AUTH_COOKIE_NAME);
}

export async function isAuthenticated(isAdmin: boolean = false): Promise<boolean> {
  const token = await getAuthToken(isAdmin);
  return !!token;
}

export function decodeBasicAuth(token: string): { username: string; password: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    if (username && password) {
      return { username, password };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getCurrentUser(isAdmin: boolean = false): Promise<AuthUser | null> {
  const token = await getAuthToken(isAdmin);
  if (!token) return null;
  
  const decoded = decodeBasicAuth(token);
  if (!decoded) return null;
  
  return {
    username: decoded.username,
    isAdmin,
  };
}
