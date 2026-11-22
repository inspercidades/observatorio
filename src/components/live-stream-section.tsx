"use client"

import { liveStreamStatus, liveStreamWhen, type LiveStreamInfo } from "@/lib/live-stream-status"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

export function LiveStreamSection() {
  const [data, setData] = useState<LiveStreamInfo | null>(null)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    fetch("/api/live-stream")
      .then((r) => r.json())
      .then((json: LiveStreamInfo) => setData(json))
      .catch(() => {})
  }, [])

  // Atualiza o estado a cada minuto para trocar "próxima" por "ao vivo" sem recarregar.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const status = liveStreamStatus(data, now)
  if (!data || status === "hidden") return null

  const isLive = status === "live"
  const when = isLive ? undefined : liveStreamWhen(data)

  return (
    <section className="bg-[#C2181A] px-4 py-6 text-white 2xl:px-16">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {isLive ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-[#C2181A]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#C2181A] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C2181A]" />
              </span>
              Ao vivo
            </span>
          ) : null}
          <h2 className="text-xl font-medium md:text-2xl">{data.title ?? "Sexta da Mobilidade"}</h2>
          {when ? <span className="text-white/80 md:text-lg">{when}</span> : null}
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start bg-white px-5 py-2.5 text-sm font-medium text-[#C2181A] transition-colors group-hover:bg-white/90 sm:self-auto">
          {isLive ? "Assistir" : "Abrir transmissão"}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </section>
  )
}
