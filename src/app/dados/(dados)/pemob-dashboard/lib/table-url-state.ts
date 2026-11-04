import { filterCategories } from "./filter-categories"

export const TABLE_URL_DEFAULTS = {
  selectedFilter: "Valor Arrecadado com Multas de Trânsito",
  selectedYear: "2024",
  globalFilter: "",
  showOnlyWithData: true,
} as const

export type TableUrlState = {
  selectedFilter: string
  selectedYear: string
  globalFilter: string
  showOnlyWithData: boolean
}

const MIN_YEAR = 2019
const MAX_YEAR = 2024

function getKnownVariables(): Set<string> {
  const variables = new Set<string>()
  for (const category of Object.values(filterCategories)) {
    for (const subcategory of Object.values(category)) {
      for (const option of subcategory.options) {
        variables.add(option)
      }
    }
  }
  return variables
}

const knownVariables = getKnownVariables()

function parseYear(value: string | null): string {
  if (!value) return TABLE_URL_DEFAULTS.selectedYear
  const year = Number(value)
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) {
    return TABLE_URL_DEFAULTS.selectedYear
  }
  return String(year)
}

function parseVariable(value: string | null): string {
  if (!value || !knownVariables.has(value)) {
    return TABLE_URL_DEFAULTS.selectedFilter
  }
  return value
}

/** Toggle is on by default; only `apenasComDados=0` turns it off. */
function parseShowOnlyWithData(value: string | null): boolean {
  if (value === null) return TABLE_URL_DEFAULTS.showOnlyWithData
  return value !== "0"
}

export function parseTableUrlState(
  searchParams: URLSearchParams | ReadonlyURLSearchParams
): TableUrlState {
  return {
    selectedFilter: parseVariable(searchParams.get("variavel")),
    selectedYear: parseYear(searchParams.get("ano")),
    globalFilter: searchParams.get("q") ?? TABLE_URL_DEFAULTS.globalFilter,
    showOnlyWithData: parseShowOnlyWithData(searchParams.get("apenasComDados")),
  }
}

export function buildTableSearchParams(state: TableUrlState): URLSearchParams {
  const params = new URLSearchParams()

  if (state.selectedFilter !== TABLE_URL_DEFAULTS.selectedFilter) {
    params.set("variavel", state.selectedFilter)
  }
  if (state.selectedYear !== TABLE_URL_DEFAULTS.selectedYear) {
    params.set("ano", state.selectedYear)
  }
  if (state.globalFilter.trim() !== TABLE_URL_DEFAULTS.globalFilter) {
    params.set("q", state.globalFilter)
  }
  if (!state.showOnlyWithData) {
    params.set("apenasComDados", "0")
  }

  return params
}

const URL_KEYS = ["variavel", "ano", "q", "apenasComDados"] as const

export function tableSearchParamsEqual(
  a: URLSearchParams | ReadonlyURLSearchParams,
  b: URLSearchParams | ReadonlyURLSearchParams
): boolean {
  return URL_KEYS.every((key) => (a.get(key) ?? null) === (b.get(key) ?? null))
}

/** Minimal ReadonlyURLSearchParams shape used by Next.js */
type ReadonlyURLSearchParams = {
  get: (name: string) => string | null
}
