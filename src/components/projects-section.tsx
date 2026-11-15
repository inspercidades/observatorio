"use client"

import catalogo from "@/app/assets/images/catalogo.png"
import dashboard from "@/app/assets/images/dashboard.png"
import tabela from "@/app/assets/images/tabela.png"
import wriDashboard from "@/app/assets/images/wri-dashboard.png"
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

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
    href: '/dados/wri-dashboard'
  },

    {
    id: 'catalogo',
    title: 'Catálogo de Dados',
    description: 'Acesse dados exclusivos de mobilidade urbana das principais cidades do Brasil. Inclui dados de bilhetagem de ônibus, GPS e GTFS.',
    image: catalogo,
    href: '/dados/catalogo-de-dados'
  },
  {
    id: 'dashboard',
    title: 'Dashboard PEMOB',
    description: 'Compare indicadores de mobilidade e transporte usando dados Pesquisa de Mobilidade Urbana do Ministério das Cidades.',
    image: dashboard,
    href: '/dados/pemob-dashboard'
  },
  {
    id: 'tabela',
    title: 'Dados PEMOB',
    description: 'Acesse os dados mais recentes da Pesquisa Nacional de Mobilidade Urbana do Ministério das Cidades em tabela interativa.',
    image: tabela,
    href: '/dados/pemob-tabela'
  }
]

export function ProjectsSection({ impact }: { impact: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const swiperRef = useRef<SwiperType | null>(null)
  const swiperReady = useRef(false)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

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
      <section className="mx-auto bg-[#f9f9f6] px-4 pt-20 sm:pt-12 pb-4 2xl:px-16">
        <h2 className="mb-6 text-3xl font-medium text-gray-900 md:text-4xl">Sobre o projeto</h2>
        <div className="flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-gray-700">
          <p>
            O Observatório Nacional de Mobilidade Sustentável (ONMS), fundado em setembro de 2023, é uma iniciativa do Centro de Estudos das Cidades do Insper. Em parceria com a Motiva, o ONMS pretende consolidar-se como um centro de referência para produção, integração e aplicação de conhecimento voltado à mobilidade sustentável. O portal do ONMS, lançado em janeiro de 2026, reúne todas as produções do Observatório e é peça central para que as decisões em mobilidade no Brasil sejam qualificadas por evidências, conhecimento e aprendizagem coletiva.
          </p>
        </div>
      </section>

      {impact}

      <section className="py-26 pb-16 mx-auto bg-[#f9f9f6]">
        <div className="mx-auto">
          {/* Section Title + Nav Buttons */}
          <div className="flex items-center justify-between px-4 2xl:px-16 mb-6">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Dados
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                className={`flex h-10 w-10 items-center justify-center border transition-colors ${
                  isBeginning
                    ? 'cursor-not-allowed border-gray-200 text-gray-300'
                    : 'cursor-pointer border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                }`}
                aria-label="Slide anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                className={`flex h-10 w-10 items-center justify-center border transition-colors ${
                  isEnd
                    ? 'cursor-not-allowed border-gray-200 text-gray-300'
                    : 'cursor-pointer border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                }`}
                aria-label="Próximo slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Projects Horizontal Scroll */}
          <div 
            className="px-4 2xl:px-16 pb-4 overflow-x-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
                requestAnimationFrame(() => { swiperReady.current = true })
              }}
              onReachBeginning={() => { if (swiperReady.current) setIsBeginning(true) }}
              onReachEnd={() => { if (swiperReady.current) setIsEnd(true) }}
              onFromEdge={(swiper) => {
                if (!swiperReady.current) return
                setIsBeginning(swiper.isBeginning)
                setIsEnd(swiper.isEnd)
              }}
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={false}
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