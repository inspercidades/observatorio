"use client"

import logoArqFuturo from '@/app/assets/images/logo_arq_futuro.png'
import insperLogo from '@/app/assets/images/logo_insper.png'
import motivaLogo from '@/app/assets/images/logo_motiva.png'
import niteroiLogo from '@/app/assets/images/logo_niteroi.png'
import rioLogo from '@/app/assets/images/logo_rio.png'
import spLogo from '@/app/assets/images/logo_sp.png'
import Image from 'next/image'
import { useEffect, useState } from "react"
import Slider from 'react-infinite-logo-slider'

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 998) // 768px is typical mobile breakpoint
    }

    // Check on mount
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

interface BrandLogo {
  id: string
  name: string
  logo: typeof motivaLogo
  alt: string
}

const fixedBrands: BrandLogo[] = [
  {
    id: 'motiva',
    name: 'Motiva',
    logo: motivaLogo,
    alt: 'Motiva logo'
  },
  {
    id: 'insper',
    name: 'Insper',
    logo: insperLogo,
    alt: 'Insper logo'
  },
  {
    id: 'arq-futuro',
    name: 'Arq.Futuro',
    logo: logoArqFuturo,
    alt: 'Arq.Futuro logo'
  },
]

const brands: BrandLogo[] = [
   {
    id: 'prefeitura-rio',
    name: 'Prefeitura do Rio',
    logo: rioLogo,
    alt: 'Prefeitura do Rio logo'
  },
  {
    id: 'cidade-sp',
    name: 'Cidade de São Paulo',
    logo: spLogo,
    alt: 'Cidade de São Paulo logo'
  },
  {
    id: 'niteroi',
    name: 'Niterói',
    logo: niteroiLogo,
    alt: 'Niterói logo'
  }
]

export function BrandSlider() {
  const isMobile = useIsMobile()
  return (
    <section className="bg-[#f9f9f6] py-16 md:pt-30 overflow-hidden">
      <div className="px-4 2xl:px-16 mx-auto max-w-full">
        <div className="flex flex-col lg:flex-row items-left lg:items-center gap-4 lg:gap-8">
          {/* Text Section - Top on mobile, Left on desktop */}
          <div className="flex-shrink-0 text-left w-full lg:w-auto">
            <h2 className="text-base leading-relaxed md:text-lg lg:text-lg text-gray-800">
             Realizadores
            </h2>
          </div>
          <div className="flex justify-left lg:justify-center items-center gap-2 md:gap-10 lg:gap-8 md:pr-20">
           
              <Image
                key={fixedBrands[0].id}
                src={fixedBrands[0].logo}
              alt="Realizadores"
              width={200}
              height={200}
              className="w-32 md:w-48 h-auto"
              />
              <Image
                key={fixedBrands[1].id}
                src={fixedBrands[1].logo}
              alt="Realizadores"
              width={120}
              height={120}
              className="pr-4 w-24 md:w-32 h-auto"
              />
              <Image
                key={fixedBrands[2].id}
                src={fixedBrands[2].logo}
              alt="Parceiros"
              width={80}
              height={80}
              className="w-16 md:w-20 h-auto"
              />
    

          </div>

          {/* Logo Slider - Bottom on mobile, Right on desktop */}
          <div className="flex-1 min-w-0 w-full lg:w-auto overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
              <div className="flex-shrink-0 text-left w-full lg:w-auto mb-4 lg:mb-0">
                <h2 className="text-base leading-relaxed md:text-lg lg:text-lg text-gray-800">
                  Parceiros
                </h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <Slider
                  duration={20}
                  pauseOnHover={true}
                  blurBorders={isMobile ? false : true}
                  blurBorderColor={'#f5f5f0'}
                  toRight={false}
                >
                  {brands.map((brand) => (
                    <Slider.Slide key={brand.id}>
                      <div className="flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            width={100}
                            height={100}
                            src={brand.logo}
                            alt={brand.alt}
                            className="h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            priority={false}
                          />
                        </div>
                      </div>
                    </Slider.Slide>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 