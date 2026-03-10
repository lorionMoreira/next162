import { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
  title: 'Login | SGE-DPE',
  description: 'Faça login na sua conta',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-theme"
      >
        {/* Network pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='30' r='1'/%3E%3Ccircle cx='60' cy='30' r='1'/%3E%3Ccircle cx='30' cy='0' r='1'/%3E%3Ccircle cx='30' cy='60' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-wide mb-4">
              SGE-DPE
            </h1>
            <p className="text-xl text-white/80 max-w-md">
              Sistema de Gerenciamento de Equipamentos da Defensoria
            </p>
          </div>
        </div>

        {/* Decorative gradient at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--color-bg-primary)] p-8">
        <div className="w-full max-w-md">
          {/* Welcome illustration */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Person at desk illustration */}
                <circle cx="100" cy="60" r="25" className="fill-theme-primary/20"/>
                <circle cx="100" cy="60" r="20" className="fill-theme-primary"/>
                {/* Head */}
                <circle cx="100" cy="45" r="15" fill="#FFD5C8"/>
                {/* Hair */}
                <path d="M85 45 Q85 30 100 30 Q115 30 115 45" fill="#4A3728"/>
                {/* Body */}
                <rect x="85" y="60" width="30" height="35" rx="5" className="fill-theme-secondary"/>
                {/* Desk */}
                <rect x="50" y="95" width="100" height="8" rx="2" className="fill-theme-primary"/>
                <rect x="55" y="103" width="90" height="30" rx="3" fill="#E8ECF0" className="stroke-theme-primary" strokeWidth="2"/>
                {/* Chat bubbles */}
                <circle cx="150" cy="40" r="18" className="fill-theme-secondary" opacity="0.8"/>
                <rect x="145" y="35" width="12" height="3" rx="1" fill="white"/>
                <rect x="145" y="40" width="8" height="3" rx="1" fill="white"/>
                <circle cx="165" cy="65" r="12" className="fill-theme-primary"/>
                <circle cx="163" cy="63" r="2" fill="white"/>
                <circle cx="167" cy="63" r="2" fill="white"/>
                {/* Decorative dots */}
                <circle cx="45" cy="50" r="3" className="fill-theme-secondary" opacity="0.5"/>
                <circle cx="160" cy="90" r="2" className="fill-theme-primary" opacity="0.5"/>
                <circle cx="35" cy="80" r="2" className="fill-theme-secondary" opacity="0.3"/>
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-theme-primary mb-2">
              Bem vindo!
            </h2>
            <p className="text-gray-600">
              SGE - Sistema de Gerenciamento de equipamentos
            </p>
          </div>

          {/* Login Form */}
          <Suspense fallback={<div className="text-center">Carregando...</div>}>
            <LoginForm />
          </Suspense>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Não tem uma conta?{' '}
            <Link
              href="/register"
              className="text-theme-primary hover:text-theme-primary-dark font-medium"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
