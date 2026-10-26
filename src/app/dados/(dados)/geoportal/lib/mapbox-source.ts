export function createVectorSource(tilesetId: string, attribution?: string) {
  return {
    type: "vector" as const,
    url: `mapbox://${tilesetId}`,
    ...(typeof attribution === "string" ? { attribution } : {}),
  }
}
