"use client"

import catalogo from "@/app/assets/images/catalogo.png"
import dashboard from "@/app/assets/images/dashboard.png"
import geoportal from "@/app/assets/images/geoportal.png"
import tabela from "@/app/assets/images/tabela.png"
import wriDashboard from "@/app/assets/images/wri-dashboard.png"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

interface Project {
  id: string
  title: string
  description: string
  image: typeof dashboard
  href: string
}

const projects: Project[] = [
  {
    id: 'qualionibus',
    title: 'Painel QualiÔnibus',
    description: 'Parceria ONMS & WRI Brasil - Dashboard dos dados do QualiÔnibus.',
    image: wriDashboard,
    href: '/projetos/dashboard-wri-brasil'
  },
  {
    id: 'geoportal',
    title: 'Geoportal',
    description: 'Visualize dados espaciais e de mobilidade urbana em mapa interativo com camadas temáticas e ferramentas de visualização.',
    image: geoportal,
    href: '/projetos/geoportal'
  },

    {
    id: 'catalogo',
    title: 'Catálogo de Dados',
    description: 'Acesse dados exclusivos de mobilidade urbana das principais cidades do Brasil. Inclui dados de bilhetagem de ônibus, GPS e GTFS.',
    image: catalogo,
    href: '/projetos/catalago-de-dados'
  },
  {
    id: 'dashboard',
    title: 'Dashboard PEMOB',
    description: 'Compare indicadores de mobilidade e transporte usando dados Pesquisa de Mobilidade Urbana do Ministério das Cidades.',
    image: dashboard,
    href: '/projetos/dashboard'
  },
  {
    id: 'tabela',
    title: 'Dados PEMOB',
    description: 'Acesse os dados mais recentes da Pesquisa Nacional de Mobilidade Urbana do Ministério das Cidades em tabela interativa.',
    image: tabela,
    href: '/projetos/tabela'
  }
]

export function ProjectsSection() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xs font-medium">Arraste</span>
        </div>
      </div>
      <section className="py-8 mx-auto bg-[#f9f9f6]">
        <div className="mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-medium text-gray-900 mb-6">
            Sobre o projeto
          </h2>
          <p className="px-4 2xl:px-16  leading-relaxed">
            Trata-se de uma iniciativa do Centro de Estudos das Cidades - Laboratório Arq. Futuro do Insper, no âmbito do seu núcleo de Mobilidade Urbana, em parceria com a Motiva, cujo objetivo é coletar dados de fontes públicas e privadas, gerenciando essas informações e produzindo pesquisas, artigos e reportes consistentes, que sejam úteis para os tomadores decisão do ecossistema de mobilidade no território nacional. A missão primordial do Observatório é prover o setor e os tomadores de decisão de um banco de dados robusto acerca dos sistemas de mobilidade urbana nas maiores cidades do país. Além disso, o Observatório Nacional de Mobilidade Urbana tem o compromisso de entregar para a sociedade como um todo estudos baseados em dados e evidências, propiciando uma melhora no processo de gestão da área no Brasil. 

 
          </p>
</div>
</section>

      <section className="py-8 mx-auto bg-[#f9f9f6]">
        <div className="mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-medium text-gray-900 mb-6">
            Dados
          </h2>

          {/* Projects Horizontal Scroll */}
          <div 
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={false} // Disable default grab cursor
              modules={[FreeMode]}
              className="!overflow-visible"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id} className="!w-[300px] md:!w-[450px] group relative">
                  <Link
                    href={project.href}
                    className="block"
                  >
                    {/* Project Card */}
                    <div className="bg-[#ECECEC] p-6 h-[250px] md:h-[350px] flex items-center justify-center">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-white shadow-sm w-full">
                        <div className="aspect-video relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Project Info - Outside the card */}
                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}