import { getCurrentUser } from '@/lib/auth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header username={user?.username} />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
