import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, createBasicAuthToken, ENDPOINTS } from '@/lib/api';
import { setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const basicAuthToken = createBasicAuthToken(username, password);

    const { data, error, status } = await apiRequest(ENDPOINTS.ADMIN_LOGIN, {
      method: 'POST',
      basicAuth: basicAuthToken,
      body: JSON.stringify({ username, password }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: status || 401 });
    }

    await setAuthCookie(basicAuthToken, true);

    return NextResponse.json({
      success: true,
      message: 'Admin login successful',
      user: { username, isAdmin: true },
      data,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
