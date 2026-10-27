import { describe, expect, it } from "vitest"
import { createVectorSource } from "./mapbox-source"

describe("createVectorSource", () => {
  it("omits attribution for existing layers without one", () => {
    const source = createVectorSource("observatorio-nacional.existing")

    expect(source).toEqual({
      type: "vector",
      url: "mapbox://observatorio-nacional.existing",
    })
    expect(source).not.toHaveProperty("attribution")
  })

  it("includes IBGE attribution for 2022 income layers", () => {
    expect(createVectorSource("observatorio-nacional.income", "Fonte: IBGE")).toEqual({
      type: "vector",
      url: "mapbox://observatorio-nacional.income",
      attribution: "Fonte: IBGE",
    })
  })
})
