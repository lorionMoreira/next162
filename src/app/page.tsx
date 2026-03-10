import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] via-[#2D4A6F] to-[#1E3A5F]">
      {/* Header */}
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                SGE-DPE
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-white/80 hover:text-white transition-colors px-4 py-2"
              >
                Entrar
              </Link>
              <Link 
                href="/register"
                className="bg-white text-[#3B5998] hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cadastrar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Sistema de Gerenciamento de
              <span className="block text-blue-300">Equipamentos da Defensoria</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
              Acesse nossos serviços de forma segura. Cadastre-se ou faça login para gerenciar 
              equipamentos e acompanhar seus registros.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register"
                className="bg-white text-[#3B5998] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Criar Conta
              </Link>
              <Link 
                href="/login"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Fazer Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Gestão de Equipamentos',
                  description: 'Cadastre e gerencie todos os equipamentos de forma centralizada.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  ),
                },
                {
                  title: 'Controle de Inventário',
                  description: 'Acompanhe o inventário em tempo real com relatórios detalhados.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  ),
                },
                {
                  title: 'Rastreamento',
                  description: 'Rastreie a localização e status de cada equipamento.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors border border-white/10"
                >
                  <div className="w-14 h-14 bg-[#3B5998] rounded-lg flex items-center justify-center text-white mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-blue-200">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto para começar?
            </h2>
            <p className="text-lg text-blue-200 mb-8">
              Junte-se aos usuários que utilizam nossa plataforma para gerenciar equipamentos de forma eficiente.
            </p>
            <Link 
              href="/register"
              className="inline-block bg-white text-[#3B5998] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Cadastrar Agora
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SGE-DPE</h3>
              <p className="text-gray-400">
                Sistema de Gerenciamento de Equipamentos da Defensoria Pública.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-400">
                Salvador, Bahia<br />
                Brasil
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Defensoria Pública. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
