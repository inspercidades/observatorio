"use client"

import { ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

interface LiveStreamData {
  url?: string
  title?: string
  description?: string
}

export function LiveStreamSection() {
  const [data, setData] = useState<LiveStreamData | null>(null)

  useEffect(() => {
    fetch("/api/live-stream")
      .then((r) => r.json())
      .then((json: LiveStreamData) => setData(json))
      .catch(() => {})
  }, [])

  // Não renderiza nada enquanto carrega ou se não houver URL configurada
  if (!data?.url) return null

  return (
    <section className="bg-[#C2181A] px-4 py-16 text-white 2xl:px-16">
      <div className="flex flex-col items-start gap-6">
        {/* Badge "Ao Vivo" com ponto pulsante */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-widest">
            Transmissão ao vivo
          </span>
        </div>

        {/* Título do evento */}
        <h2 className="text-3xl font-medium md:text-5xl">
          {data.title ?? "Sexta da Mobilidade"}
        </h2>

        {/* Descrição opcional (ex: "30/11 · 12h–14h") */}
        {data.description ? (
          <p className="text-lg text-white/80">{data.description}</p>
        ) : null}

        {/* Botão CTA */}
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-[#C2181A] transition-colors hover:bg-white/90"
        >
          Assistir agora
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
