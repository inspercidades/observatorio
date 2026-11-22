'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function GeoPortalHighlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(sectionRef, { amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Conforme a seção entra no viewport, o vídeo cresce de 75% → 100%
  // e as bordas arredondadas desaparecem
  const scale = useTransform(scrollYProgress, [0.05, 0.5], [0.75, 1])
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.5], [24, 0])

  // Toca só quando visível e sem preferência por movimento reduzido
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView && !reduceMotion) void video.play().catch(() => {})
    else video.pause()
  }, [inView, reduceMotion])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#2F2C2C] py-20 text-white"
    >
      <h2 className="px-4 pb-10 text-3xl font-medium md:text-5xl 2xl:px-16">GeoPortal</h2>

      <div className="px-4 2xl:px-16">
        <motion.div
          style={reduceMotion ? undefined : { scale, borderRadius }}
          className="origin-center overflow-hidden shadow-2xl"
        >
          <Link
            href="/dados/geoportal"
            aria-label="Abrir o GeoPortal"
            className="group relative block"
          >
            <video
              ref={videoRef}
              className="w-full transition-[filter] duration-300 group-hover:brightness-75"
              src="/videos/geoportal.mp4"
              poster="/videos/geoportal-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            {/* Em telas com hover, o convite aparece sobre o mapa; no toque, fica abaixo do vídeo */}
            <span className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:flex">
              <span className="inline-flex items-center gap-2 bg-white px-6 py-3 text-base font-medium text-black shadow-lg">
                Abrir o mapa <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </Link>
          <Link
            href="/dados/geoportal"
            className="flex items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-medium text-black [@media(hover:hover)]:hidden"
          >
            Abrir o mapa <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
