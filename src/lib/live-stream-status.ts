/** Dados da transmissão como chegam ao navegador (datas em ISO 8601). */
export interface LiveStreamInfo {
  url?: string
  title?: string
  /** Texto livre usado quando não há horário cadastrado. */
  description?: string
  startsAt?: string
  endsAt?: string
}

export type LiveStreamStatus = "hidden" | "upcoming" | "live"

/** Antecedência com que o selo "Ao vivo" aparece. */
const LIVE_LEAD_MS = 15 * 60 * 1000

function parse(value?: string) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

/**
 * Sem link, a faixa some. Com horário, ela anuncia a transmissão até 15 minutos
 * antes do início, fica "ao vivo" até o fim e some depois.
 */
export function liveStreamStatus(stream: LiveStreamInfo | null, now: Date): LiveStreamStatus {
  if (!stream?.url?.trim()) return "hidden"

  const start = parse(stream.startsAt)
  const end = parse(stream.endsAt)
  if (end && now > end) return "hidden"
  if (start && now.getTime() < start.getTime() - LIVE_LEAD_MS) return "upcoming"
  return "live"
}

/** "27/11, 12h" ou "27/11, 12h30", no fuso de São Paulo. */
export function liveStreamWhen(stream: LiveStreamInfo): string | undefined {
  const start = parse(stream.startsAt)
  if (!start) return stream.description

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(start)
      .map((part) => [part.type, part.value]),
  )
  const minutes = parts.minute === "00" ? "" : parts.minute
  return `${parts.day}/${parts.month}, ${Number(parts.hour)}h${minutes}`
}
