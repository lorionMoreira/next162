'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCPF, validateCPF, extractCPFNumbers } from '@/utils';

interface FormErrors {
  cpf?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData((prev) => ({ ...prev, cpf: formatCPF(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const cpfNumbers = extractCPFNumbers(formData.cpf);
    if (!cpfNumbers) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      const cpfNumbers = extractCPFNumbers(formData.cpf);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cpfNumbers,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Falha no cadastro');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Ocorreu um erro');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-white rounded-lg">
        <div className="w-16 h-16 mx-auto mb-4 bg-theme-success/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-theme-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Cadastro Realizado!
        </h3>
        <p className="text-gray-600">
          Redirecionando para a página de login...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {serverError && (
        <div className="p-3 text-sm text-theme-error bg-red-50 border border-red-200 rounded-lg">
          {serverError}
        </div>
      )}

      {/* CPF field */}
      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
          CPF:
        </label>
        <div className="relative">
          <input
            id="cpf"
            name="cpf"
            type="text"
            inputMode="numeric"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            autoComplete="off"
            className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all ${
              errors.cpf ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
        </div>
        {errors.cpf && <p className="mt-1 text-sm text-theme-error">{errors.cpf}</p>}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email:
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ex: joao@email.com"
            autoComplete="email"
            className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        {errors.email && <p className="mt-1 text-sm text-theme-error">{errors.email}</p>}
      </div>

      {/* Password field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Senha:
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        {errors.password && <p className="mt-1 text-sm text-theme-error">{errors.password}</p>}
      </div>

      {/* Confirm Password field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirme sua Senha:
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repita a senha"
            autoComplete="new-password"
            className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-theme-error">{errors.confirmPassword}</p>}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-theme-primary hover:bg-theme-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          'Cadastrar'
        )}
      </button>
    </form>
  );
}
