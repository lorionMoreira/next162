import { NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth';
import { apiRequest, ENDPOINTS, SolicitacoesResponse } from '@/lib/api';

export async function GET() {
  try {
    const authToken = await getAuthToken();

    if (!authToken) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { data, error, status } = await apiRequest<SolicitacoesResponse>(
      ENDPOINTS.SOLICITACOES,
      {
        method: 'GET',
        basicAuth: authToken,
      }
    );

    if (error) {
      return NextResponse.json({ error }, { status: status || 500 });
    }

    if (!data || !data.success) {
      return NextResponse.json(
        { error: 'Falha ao buscar solicitações' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
