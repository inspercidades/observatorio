import type { LayerStyle, LegendItem } from "./layer-styles"

const INCOME_FIELD = "renda_media_responsavel_2022"
const STATUS_FIELD = "rendimento_status"
const SOURCE_PREFIX = "renda_responsavel_2022_"

export const INCOME_2022_BREAKS: Record<string, readonly number[]> = {
  rio: [1600, 2200, 3300, 6800],
  rec: [1300, 1500, 2300, 5800],
  bhe: [1900, 2600, 3900, 7000],
  goi: [2100, 2700, 3700, 6200],
  frt: [1300, 1500, 2000, 3300],
  nit: [1700, 3200, 5700, 9500],
  sad: [2200, 3100, 4000, 5600],
  ssa: [1300, 1500, 1900, 4000],
  cam: [2100, 2800, 4000, 6600],
  cur: [2600, 3500, 5000, 7300],
  poa: [2000, 3100, 4800, 7500],
  spo: [1900, 2600, 4000, 8000],
}

export const INCOME_2022_COLORS = [
  "#fff7fb",
  "#ece2f0",
  "#a6bddb",
  "#3690c0",
  "#02818a",
] as const

export const INCOME_2022_MISSING_COLOR = "#bdbdbd"

export function createIncome2022Style(
  id: string,
  sourceLayer: string,
  breaks: readonly number[],
): LayerStyle {
  if (
    breaks.length !== 4 ||
    breaks.some((value, index) =>
      !Number.isFinite(value) ||
      value <= 0 ||
      value % 100 !== 0 ||
      (index > 0 && value <= breaks[index - 1])
    )
  ) {
    throw new Error("Income breaks must be four increasing positive multiples of R$ 100")
  }

  return {
    id,
    type: "fill",
    source: "composite",
    "source-layer": sourceLayer,
    layout: { visibility: "none" },
    paint: {
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        [
          "all",
          ["==", ["get", STATUS_FIELD], "observado"],
          ["has", INCOME_FIELD],
        ],
        [
          "step",
          ["to-number", ["get", INCOME_FIELD], -1],
          INCOME_2022_COLORS[0],
          breaks[0],
          INCOME_2022_COLORS[1],
          breaks[1],
          INCOME_2022_COLORS[2],
          breaks[2],
          INCOME_2022_COLORS[3],
          breaks[3],
          INCOME_2022_COLORS[4],
        ],
        INCOME_2022_MISSING_COLOR,
      ],
    },
  }
}

export function income2022LegendFromStyle(style: LayerStyle): LegendItem[] | null {
  if (!style["source-layer"].startsWith(SOURCE_PREFIX)) return null

  const expression = style.paint["fill-color"]
  if (!Array.isArray(expression) || expression[0] !== "case") return null

  const step = expression[2]
  if (!Array.isArray(step) || step[0] !== "step" || step.length !== 11) return null

  const breaks = [step[3], step[5], step[7], step[9]]
  const colors = [step[2], step[4], step[6], step[8], step[10]]
  const missingColor = expression[3]
  if (
    breaks.some((value) => typeof value !== "number") ||
    colors.some((value) => typeof value !== "string") ||
    typeof missingColor !== "string"
  ) return null

  const format = (value: number) => `R$ ${new Intl.NumberFormat("pt-BR").format(value)}`
  const items: LegendItem[] = [
    { color: colors[0] as string, label: "Rendimento médio mensal", value: `Menos de ${format(breaks[0] as number)}` },
  ]

  for (let index = 1; index < colors.length - 1; index += 1) {
    items.push({
      color: colors[index] as string,
      label: "Rendimento médio mensal",
      value: `${format(breaks[index - 1] as number)} a < ${format(breaks[index] as number)}`,
    })
  }

  items.push({
    color: colors[4] as string,
    label: "Rendimento médio mensal",
    value: `${format(breaks[3] as number)} ou mais`,
  })
  items.push({
    color: missingColor,
    label: "Rendimento médio mensal",
    value: "Sem valor divulgado",
  })
  return items
}
