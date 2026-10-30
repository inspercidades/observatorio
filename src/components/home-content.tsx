"use client"

import { BrandSlider } from "@/components/brand-slider"
import { GeoPortalHighlight } from "@/components/geoportal-highlight"
import { Header } from "@/components/header"
import { HeroSwiper } from "@/components/hero-swiper"
import { ProjectsSection } from "@/components/projects-section"
import type { ReactNode } from "react"

interface HomeContentProps {
  agenda: ReactNode
  impact: ReactNode
}

export function HomeContent({ agenda, impact }: HomeContentProps) {
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header isBgDark={true} />
      </div>

      {/* Hero Swiper */}
      <HeroSwiper />

      {/* GeoPortal */}
      <GeoPortalHighlight />

      {/* Brand Slider Section */}
      <BrandSlider />

      {/* Projects Section */}
      <ProjectsSection impact={impact} />

      {/* Agenda: eventos futuros, cursos abertos e eventos recentes */}
      {agenda}

      {/* video cast */}
      {/* <VideoCastSection /> */}
    </div>
  )
}
