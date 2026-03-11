import { getCurrentUser } from '@/lib/auth';
import DashboardShell from '@/components/layout/DashboardShell';

export const metadata = {
  title: 'Painel | SGE-DPE',
  description: 'Seu painel de controle',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <DashboardShell username={user?.username}>
      {children}
    </DashboardShell>
  );
}
