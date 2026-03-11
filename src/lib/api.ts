export const API_URL = 'https://agenda.defensoria.ba.def.br/api';

export const ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/cadastro-basico',
  SOLICITACOES: '/listagem-Solicitacoes',
} as const;

export interface Solicitacao {
  id_agendamento: number | null;
  id: number;
  requestDate: string;
  scheduleDate: string | null;
  subject: string;
  description: string;
  answer: string | null;
  status: number;
  unit: string | null;
  address: string | null;
  process: string;
  sistema: string;
  numero: string | null;
}

export interface SolicitacoesResponse {
  success: boolean;
  data: Solicitacao[];
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { basicAuth?: string } = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  const { basicAuth, ...fetchOptions } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (basicAuth) {
    headers['Authorization'] = `Basic ${basicAuth}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: null,
        error: data?.message || data?.error || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    return { data, error: null, status: response.status };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
}

export function createBasicAuthToken(username: string, password: string): string {
  return Buffer.from(`${username}:${password}`).toString('base64');
}
