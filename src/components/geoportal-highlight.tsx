'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  'Rotas de ônibus, metrô, ciclovias e embarques',
  'Sinistros de trânsito, densidade e renda (Censo 2022)',
]

export function GeoPortalHighlight() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Conforme a seção entra no viewport, o vídeo cresce de 75% → 100%
  // e as bordas arredondadas desaparecem
  const scale = useTransform(scrollYProgress, [0.05, 0.5], [0.75, 1])
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.5], [24, 0])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#2F2C2C] py-20 text-white"
    >
      {/* Texto — centralizado acima do vídeo */}
      <div className="flex flex-col items-start gap-6 px-4 pb-14 2xl:px-16">
        <h2 className="text-3xl font-medium md:text-5xl">GeoPortal</h2>
        <p className="max-w-xl text-lg text-white/80">
          Mapa interativo com dados de mobilidade urbana de 12 cidades.
        </p>
        <ul className="flex flex-col gap-3 text-white/80 sm:flex-row sm:flex-wrap sm:gap-8">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 bg-[#C2181A]" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href="/dados/geoportal"
          className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
        >
          Explorar o GeoPortal <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Vídeo — cresce conforme o usuário scrolla */}
      <div className="px-4 2xl:px-16">
        <motion.div
          style={{ scale, borderRadius }}
          className="origin-center overflow-hidden shadow-2xl"
        >
        <Link href="/dados/geoportal" className="block">
          <video
            className="w-full"
            src="/videos/geoportal.mp4"
            poster="/videos/geoportal-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Demonstração do GeoPortal"
          />
        </Link>
        </motion.div>
      </div>
    </section>
  )
}
