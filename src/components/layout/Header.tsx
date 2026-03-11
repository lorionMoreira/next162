'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  username?: string;
}

export default function Header({ username }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <header className="bg-theme-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold">
              SGE-DPE
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Início
            </Link>
            <Link
              href="/dashboard/profile"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Perfil
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {username && (
              <span className="text-sm hidden sm:block">
                Olá, <strong>{username}</strong>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium border border-white/50 rounded-lg hover:bg-white hover:text-theme-primary transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
