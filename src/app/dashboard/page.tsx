import { getCurrentUser } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const stats = [
    { label: 'Equipamentos Ativos', value: '156', color: 'bg-theme-primary' },
    { label: 'Em Manutenção', value: '12', color: 'bg-theme-warning' },
    { label: 'Disponíveis', value: '89', color: 'bg-theme-success' },
    { label: 'Total Cadastrado', value: '257', color: 'bg-theme-secondary' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bem vindo, {user?.username || 'Usuário'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Aqui está o resumo das suas atividades hoje.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-full -mr-8 -mt-8`} />
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Novo equipamento cadastrado', time: '2 horas atrás' },
                { action: 'Atualização de inventário', time: '5 horas atrás' },
                { action: 'Relatório gerado', time: '1 dia atrás' },
                { action: 'Manutenção concluída', time: '3 dias atrás' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {activity.action}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Novo Equipamento', icon: '📦' },
                { label: 'Ver Inventário', icon: '📋' },
                { label: 'Relatórios', icon: '📊' },
                { label: 'Manutenção', icon: '🔧' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-theme-primary/5 hover:border-theme-primary/30 transition-colors"
                >
                  <span className="text-2xl mb-2">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
