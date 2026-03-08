import { getCurrentUser } from '@/lib/auth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Admin Dashboard | Defensoria Pública',
  description: 'Administration panel',
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header isAdmin username={user?.username} />
      
      <div className="flex flex-1">
        <Sidebar isAdmin />
        
        <main className="flex-1 p-6 overflow-auto bg-gray-900">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
