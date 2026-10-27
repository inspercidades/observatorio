import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LayerLegend } from "./map-legend"

vi.mock("../lib/layer-styles", () => ({
  getLayerStyle: () => ({
    id: "income",
    type: "fill",
    source: "composite",
    "source-layer": "renda_responsavel_2022_rio",
    paint: {
      "fill-color": [
        "case", ["==", ["get", "rendimento_status"], "observado"],
        ["step", ["get", "renda_media_responsavel_2022"], "#fff7fb", 1600, "#ece2f0", 2200, "#a6bddb", 3300, "#3690c0", 6800, "#02818a"],
        "#bdbdbd",
      ],
    },
  }),
  getLayerLegend: () => [{ color: "#000000", label: "Incorrect", value: "Wrong fallback" }],
}))

describe("2022 income map legend", () => {
  it("shows numeric ranges and the missing-data swatch from the income style", () => {
    const { container } = render(
      <LayerLegend
        layerId="renda-rio-4ks1k8"
        layerName="Rendimento médio mensal do responsável com rendimento"
        layerType="fill"
        sourceLayer="renda_responsavel_2022_rio"
      />,
    )

    expect(screen.getByText("Menos de R$ 1.600")).toBeInTheDocument()
    expect(screen.getByText("R$ 6.800 ou mais")).toBeInTheDocument()
    expect(screen.getByText("Sem valor divulgado")).toBeInTheDocument()
    expect(screen.queryByText("Wrong fallback")).not.toBeInTheDocument()
    expect(container.querySelectorAll('[style*="background-color"]')).toHaveLength(6)
  })
})
