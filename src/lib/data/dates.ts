/** Converte "dd/mm/aaaa" em Date local, à meia-noite. */
export function parseBrDate(date: string): Date {
  const [day, month, year] = date.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export function startOfToday(): Date {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate())
}
