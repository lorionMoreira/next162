import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie, clearAllAuthCookies } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const clearAll = searchParams.get('all') === 'true';

    if (clearAll) {
      await clearAllAuthCookies();
    } else {
      await clearAuthCookie(isAdmin);
    }

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
