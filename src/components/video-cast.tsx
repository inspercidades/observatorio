"use client"

import videocast1 from "@/app/assets/images/videocast1.png"
import videocast2 from "@/app/assets/images/videocast2.png"
import videocast3 from "@/app/assets/images/videocast3.png"
import videocast4 from "@/app/assets/images/videocast4.png"
import videocast5 from "@/app/assets/images/videocast5.png"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

interface VideoCast {
  id: string
  title: string
  description: string
  image: typeof videocast1
  href: string
}

const videoCast: VideoCast[] = [
  {
    id: 'event1',
    title: 'Soluções baseadas na natureza e mobilidade urbana',
    description: 'Sexta da Mobilidade',
    image: videocast1,
    href: '/dados/pemob-dashboard'
  },
  {
    id: 'event2',
    title: 'Apresentação do Observatório Nac. de Mobilidade Sustentável para a comunidade do Rio de Janeiro ',
    description: 'Sexta da Mobilidade',
    image: videocast2,
    href: '/dados/geoportal'
  },
  {
    id: 'event3',
    title: 'Gestão metropolitana: desafios e oportunidades',
    description: 'Sexta da Mobilidade',
    image: videocast3,
    href: '/dados/catalogo-de-dados'
  },
  {
    id: 'event4',
    title: 'Lançamento do guia de eletromobilidade',
    description: 'Sexta da Mobilidade',
    image: videocast4,
    href: '/dados/pemob-tabela'
  },
  {
    id: 'event5',
    title: 'Soluções baseadas na natureza e mobilidade urbana',
    description: 'Sexta da Mobilidade',
    image: videocast5,
    href: '/dados/pemob-tabela'
  },
]

export function VideoCastSection() {
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

      <section className="py-16 mx-auto bg-[#f9f9f6]">
        <div className="mx-auto">
          <Link href="/eventos">
          <h5 className="text-[#2F2C2C] text-sm px-4 2xl:px-16">Ver mais</h5>
          </Link>
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl px-4 2xl:px-16 font-medium text-gray-900 mb-10">
          <Link href="/eventos">
            VídeoCast
          </Link>
          </h2>

          {/* VideoCast Horizontal Scroll */}
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
              {videoCast.map((video) => (
                <SwiperSlide key={video.id} className="!w-[250px] md:!w-[350px] group relative">
                  <Link
                    href={video.href}
                    className="block"
                  >
                    {/* VideoCast Card */}
                    <div className="relative overflow-hidden rounded-lg h-[350px] w-[250px] md:h-[450px] md:w-[350px]">
                      <Image
                        src={video.image}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* VideoCast Info - Outside the card */}
                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {video.description}
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
