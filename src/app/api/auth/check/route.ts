import { NextResponse } from 'next/server';
import { getAuthToken, decodeBasicAuth } from '@/lib/auth';

export async function GET() {
  try {
    const clientToken = await getAuthToken(false);
    const adminToken = await getAuthToken(true);

    if (adminToken) {
      const decoded = decodeBasicAuth(adminToken);
      return NextResponse.json({
        isAuthenticated: true,
        isAdmin: true,
        username: decoded?.username || null,
      });
    }

    if (clientToken) {
      const decoded = decodeBasicAuth(clientToken);
      return NextResponse.json({
        isAuthenticated: true,
        isAdmin: false,
        username: decoded?.username || null,
      });
    }

    return NextResponse.json({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    });
  }
}
