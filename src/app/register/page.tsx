import { Suspense } from 'react';
import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';

export const metadata = {
  title: 'Cadastro | SGE-DPE',
  description: 'Crie sua conta no sistema',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-theme">
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

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--color-bg-primary)] p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Welcome illustration */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Person illustration */}
                <circle cx="100" cy="60" r="25" className="fill-theme-primary/20"/>
                <circle cx="100" cy="60" r="20" className="fill-theme-primary"/>
                <circle cx="100" cy="45" r="15" fill="#FFD5C8"/>
                <path d="M85 45 Q85 30 100 30 Q115 30 115 45" fill="#4A3728"/>
                <rect x="85" y="60" width="30" height="35" rx="5" className="fill-theme-secondary"/>
                {/* Plus sign */}
                <circle cx="145" cy="55" r="20" className="fill-theme-primary"/>
                <rect x="140" y="45" width="10" height="20" rx="2" fill="white"/>
                <rect x="135" y="50" width="20" height="10" rx="2" fill="white"/>
                {/* Document */}
                <rect x="50" y="90" width="40" height="50" rx="3" fill="white" className="stroke-theme-primary" strokeWidth="2"/>
                <rect x="55" y="100" width="25" height="3" rx="1" className="fill-theme-secondary"/>
                <rect x="55" y="108" width="20" height="3" rx="1" className="fill-theme-secondary/50"/>
                <rect x="55" y="116" width="28" height="3" rx="1" className="fill-theme-secondary/50"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-theme-primary mb-2">
              Criar Conta
            </h2>
            <p className="text-gray-600 text-sm">
              Preencha seus dados para se cadastrar
            </p>
          </div>

          {/* Register Form */}
          <Suspense fallback={<div className="text-center">Carregando...</div>}>
            <RegisterForm />
          </Suspense>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="text-theme-primary hover:text-theme-primary-dark font-medium"
            >
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
