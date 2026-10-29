"use client"

import { BrandSlider } from "@/components/brand-slider"
import { GeoPortalHighlight } from "@/components/geoportal-highlight"
import { AgendaHome } from "@/components/agenda-home"
import { Header } from "@/components/header"
import { HeroSwiper } from "@/components/hero-swiper"
import { ImpactNumbersSection } from "@/components/impact-numbers-section"
import { ProjectsSection } from "@/components/projects-section"

export function HomeContent() {
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
      <ProjectsSection />

      {/* Agenda: eventos futuros, cursos abertos e eventos recentes */}
      <AgendaHome />

      {/* video cast */}
      {/* <VideoCastSection /> */}
    </div>
  )
}
