import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, createBasicAuthToken, ENDPOINTS } from '@/lib/api';
import { setAuthCookie } from '@/lib/auth';

interface LoginResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

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

    const { data, error, status } = await apiRequest<LoginResponse>(ENDPOINTS.LOGIN, {
      method: 'POST',
      basicAuth: basicAuthToken,
      body: JSON.stringify({ username, password }),
    });

    if (!data) {
      return NextResponse.json(
        { error: error || 'Invalid response from server' },
        { status: 401 }
      );
    }

    if (data.success === false) {
      return NextResponse.json(
        { error: error || data.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    await setAuthCookie(basicAuthToken, false);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { username },
      data,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
