import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, ENDPOINTS } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error, status } = await apiRequest(ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (error) {
      return NextResponse.json({ error }, { status: status || 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
