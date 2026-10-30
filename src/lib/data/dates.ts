const BR_DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/
const AGENDA_TIME_ZONE = "America/Sao_Paulo"

/** Converte "dd/mm/aaaa" em Date local, à meia-noite. Recusa ano solto e dia inexistente. */
export function parseBrDate(date: string): Date {
  const match = BR_DATE.exec(date)
  if (!match) throw new Error(`Data inválida: ${date}`)

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const parsed = new Date(year, month - 1, day)

  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    throw new Error(`Data inválida: ${date}`)
  }

  return parsed
}

/** Meia-noite do dia corrente em America/Sao_Paulo, independente do fuso do servidor. */
export function startOfToday(timeZone = AGENDA_TIME_ZONE): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())

  function read(type: Intl.DateTimeFormatPartTypes) {
    return Number(parts.find((part) => part.type === type)?.value)
  }

  return new Date(read("year"), read("month") - 1, read("day"))
}

/** Intervalo de datas para cards: "17 a 19/11/2026", "30/10 a 02/11/2026". Sem fim, só a data. */
export function formatDateRange(start: string, end?: string): string {
  if (!end || end === start) return start
  const [startDay, startMonth, startYear] = start.split("/")
  const [, endMonth, endYear] = end.split("/")
  if (startYear !== endYear) return `${start} a ${end}`
  if (startMonth !== endMonth) return `${startDay}/${startMonth} a ${end}`
  return `${startDay} a ${end}`
}
