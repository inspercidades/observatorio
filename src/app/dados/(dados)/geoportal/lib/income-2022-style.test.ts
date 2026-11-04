import { describe, expect, it } from "vitest"
import {
  createIncome2022Style,
  income2022LegendFromStyle,
  INCOME_2022_COLORS,
  INCOME_2022_MISSING_COLOR,
} from "./income-2022-style"

const sourceLayer = "renda_responsavel_2022_rio"
const breaks = [1600, 2200, 3300, 6800] as const

describe("2022 responsible-person income style", () => {
  it("uses the published numeric field for five bins and a separate missing color", () => {
    const style = createIncome2022Style("renda-rio-4ks1k8", sourceLayer, breaks)

    expect(style["source-layer"]).toBe(sourceLayer)
    expect(style.paint["fill-color"]).toEqual([
      "case",
      [
        "all",
        ["==", ["get", "rendimento_status"], "observado"],
        ["has", "renda_media_responsavel_2022"],
      ],
      [
        "step",
        ["to-number", ["get", "renda_media_responsavel_2022"], -1],
        INCOME_2022_COLORS[0],
        1600,
        INCOME_2022_COLORS[1],
        2200,
        INCOME_2022_COLORS[2],
        3300,
        INCOME_2022_COLORS[3],
        6800,
        INCOME_2022_COLORS[4],
      ],
      INCOME_2022_MISSING_COLOR,
    ])
  })

  it("shows every monetary bin and the undisclosed-value class in the legend", () => {
    const style = createIncome2022Style("renda-rio-4ks1k8", sourceLayer, breaks)

    expect(income2022LegendFromStyle(style)).toEqual([
      { color: INCOME_2022_COLORS[0], label: "Rendimento médio mensal", value: "Menos de R$ 1.600" },
      { color: INCOME_2022_COLORS[1], label: "Rendimento médio mensal", value: "R$ 1.600 a < R$ 2.200" },
      { color: INCOME_2022_COLORS[2], label: "Rendimento médio mensal", value: "R$ 2.200 a < R$ 3.300" },
      { color: INCOME_2022_COLORS[3], label: "Rendimento médio mensal", value: "R$ 3.300 a < R$ 6.800" },
      { color: INCOME_2022_COLORS[4], label: "Rendimento médio mensal", value: "R$ 6.800 ou mais" },
      { color: INCOME_2022_MISSING_COLOR, label: "Rendimento médio mensal", value: "Sem valor divulgado" },
    ])
  })

  it("rejects invalid or ambiguous breakpoints", () => {
    expect(() => createIncome2022Style("income", sourceLayer, [100, 200, 300])).toThrow()
    expect(() => createIncome2022Style("income", sourceLayer, [100, 200, 200, 400])).toThrow()
    expect(() => createIncome2022Style("income", sourceLayer, [100, 250, 300, 400])).toThrow()
    expect(() => createIncome2022Style("income", sourceLayer, [100, 200, Number.NaN, 400])).toThrow()
  })
})
