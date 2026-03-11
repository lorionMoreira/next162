'use client';

import { useEffect, useState } from 'react';
import { Solicitacao } from '@/types';

const statusLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  2: { label: 'Em Análise', color: 'bg-blue-100 text-blue-800' },
  3: { label: 'Aprovado', color: 'bg-green-100 text-green-800' },
  4: { label: 'Rejeitado', color: 'bg-red-100 text-red-800' },
  5: { label: 'Aguardando', color: 'bg-gray-100 text-gray-800' },
};

export default function SolicitacoesList() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSolicitacoes() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/solicitacoes');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao carregar solicitações');
        }

        setSolicitacoes(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSolicitacoes();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
        <div className="flex items-center space-x-3 text-red-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (solicitacoes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-500">Nenhuma solicitação encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Minhas Solicitações
          </h2>
          <span className="text-sm text-gray-500">
            {solicitacoes.length} {solicitacoes.length === 1 ? 'item' : 'itens'}
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {solicitacoes.map((solicitacao) => {
          const statusInfo = statusLabels[solicitacao.status] || statusLabels[5];
          
          return (
            <div
              key={solicitacao.id}
              className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Subject */}
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {solicitacao.subject}
                    </h3>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {solicitacao.description}
                  </p>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {solicitacao.requestDate}
                    </span>
                    
                    {solicitacao.sistema && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {solicitacao.sistema}
                      </span>
                    )}
                    
                    {solicitacao.numero && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        #{solicitacao.numero}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <button className="text-theme-primary hover:text-theme-primary-dark text-sm font-medium whitespace-nowrap">
                  Ver detalhes →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
