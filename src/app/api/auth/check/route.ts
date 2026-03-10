import { NextResponse } from 'next/server';
import { getAuthToken, decodeBasicAuth } from '@/lib/auth';

export async function GET() {
  try {
    const token = await getAuthToken();

    if (token) {
      const decoded = decodeBasicAuth(token);
      return NextResponse.json({
        isAuthenticated: true,
        username: decoded?.username || null,
      });
    }

    return NextResponse.json({
      isAuthenticated: false,
      username: null,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      isAuthenticated: false,
      username: null,
    });
  }
}
