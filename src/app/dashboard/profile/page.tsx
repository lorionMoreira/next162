import { getCurrentUser } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'Perfil | SGE-DPE',
  description: 'Gerencie seu perfil',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Perfil
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gerencie suas informações de conta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="w-24 h-24 bg-theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.username || 'Usuário'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Membro</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Usuário
                </dt>
                <dd className="text-sm text-gray-900 dark:text-white mt-1 sm:mt-0">
                  {user?.username || 'N/A'}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tipo de Conta
                </dt>
                <dd className="text-sm text-gray-900 dark:text-white mt-1 sm:mt-0">
                  Usuário Padrão
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </dt>
                <dd className="mt-1 sm:mt-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-theme-success/20 text-theme-success">
                    Ativo
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
