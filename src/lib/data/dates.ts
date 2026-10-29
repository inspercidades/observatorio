/** Converte "dd/mm/aaaa" em Date local, à meia-noite. */
export function parseBrDate(date: string): Date {
  const [day, month, year] = date.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export function startOfToday(): Date {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate())
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
