'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

interface HeaderProps {
  isAdmin?: boolean;
  username?: string;
}

export default function Header({ isAdmin = false, username }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`/api/auth/logout?admin=${isAdmin}`, {
        method: 'POST',
      });
      router.push(isAdmin ? '/admin/login' : '/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={`${isAdmin ? 'bg-gray-800' : 'bg-blue-600'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href={isAdmin ? '/admin/dashboard' : '/dashboard'}
              className="text-xl font-bold"
            >
              {isAdmin ? 'Admin Panel' : 'Dashboard'}
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {!isAdmin && (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Profile
                </Link>
              </>
            )}
            {isAdmin && (
              <>
                <Link
                  href="/admin/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/dashboard/users"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Users
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {username && (
              <span className="text-sm hidden sm:block">
                Welcome, <strong>{username}</strong>
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
