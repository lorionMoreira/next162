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
