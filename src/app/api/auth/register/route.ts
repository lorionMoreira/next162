import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, ENDPOINTS } from '@/lib/api';
import { RegisterResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const { data, error, status } = await apiRequest<RegisterResponse>(
      ENDPOINTS.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (error) {
      return NextResponse.json(
        { success: false, error },
        { status: status || 400 }
      );
    }

    if (!data || data.success === false) {
      return NextResponse.json(
        { success: false, error: 'Falha no cadastro. Verifique os dados informados.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cadastro realizado com sucesso',
      data: data.data,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
