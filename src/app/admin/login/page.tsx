import Link from 'next/link';
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
  title: 'Admin Login | Defensoria Pública',
  description: 'Admin portal login',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border border-gray-700">
        <CardHeader>
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-600">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <CardTitle className="text-white">Admin Portal</CardTitle>
            <p className="text-gray-400 mt-1">
              Restricted access - authorized personnel only
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
            <LoginForm isAdmin />
          </Suspense>
        </CardContent>

        <CardFooter>
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-gray-300 w-full text-center block"
          >
            ← Back to User Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
