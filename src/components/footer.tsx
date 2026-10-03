import { CookiePreferencesLink } from '@/components/cookie-consent'
import Image from 'next/image'
import Link from 'next/link'

const projetosItems = [
  {
    title: "Catálogo de Dados",
    href: "/projetos/catalago-de-dados",
    description: "Navegue por um catálogo interativo com dados de mobilidade de diversas cidades brasileiras.",
  },
  {
    title: "Dashboard PEMOB",
    href: "/projetos/dashboard",
    description: "Visualize dados espaciais e de mobilidade urbana em mapa interativo com camadas temáticas e ferramentas de visualização.",
  },
  {
    title: "Dados PEMOB",
    href: "/projetos/tabela",
    description: "Explore indicadores de mobilidade de diferentes cidades brasileiras em uma tabela interativa.",
  },
  {
    title: "Painel QualiÔnibus",
    href: "/projetos/dashboard-wri-brasil",
    description: "Parceria ONMS & WRI Brasil - Dashboard dos dados do QualiÔnibus.",
  },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 ">
      <div className="px-4 2xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          
          {/* Left Section - Logo and Text */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-preto.png"
                alt="Observatório Nacional de Mobilidade Sustentável"
                width={400}
                height={80}
                className=""
              />
            </Link>
          </div>

          {/* Right Section - Navigation */}
          <nav className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <Link 
                href="/sobre" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Sobre
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link 
                href="/projetos/geoportal" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                GeoPortal
              </Link>
            </div>
 {/* Dados de mobilidade dropdown */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm font-medium">Mobilidade em dados</span>
              <div className="flex flex-col gap-1">
                {projetosItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors text-xs"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link 
                href="/publicacoes" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Publicações
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/eventos" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Eventos
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link 
                href="/videos" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Vídeos
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link 
                href="/cursos" 
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                Cursos
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-gray-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-left text-gray-500 text-xs">
            &copy; 2025 Observatório Nacional de Mobilidade Sustentável. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacidade" className="hover:text-gray-800 transition-colors">
              Privacidade
            </Link>
            <CookiePreferencesLink className="hover:text-gray-800 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
