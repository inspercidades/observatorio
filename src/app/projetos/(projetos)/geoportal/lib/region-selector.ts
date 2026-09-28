import regionManifest from "./region-manifest.json" with { type: "json" }

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

export function getVisibleRegions(query: string, selectedRegion: string) {
  const search = normalize(query.trim())
  const regions = regionManifest.regions.filter((region) =>
    !search || normalize(region.name).includes(search) ||
    region.municipalities.some((city) => normalize(city.name).includes(search))
  )

  return search || !selectedRegion
    ? regions
    : regions.sort((a, b) => Number(b.id === selectedRegion) - Number(a.id === selectedRegion))
}
