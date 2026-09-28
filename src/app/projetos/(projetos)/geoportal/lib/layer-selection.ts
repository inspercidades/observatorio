type SelectableLayer = { id: string; layerType?: string }

export function toggleLayer(current: string[], id: string, layers: SelectableLayer[]): string[] {
  if (current.includes(id)) return current.filter((selected) => selected !== id)

  const layer = layers.find((candidate) => candidate.id === id)
  if (!layer) return current

  if (layer.layerType === 'fill') {
    const fills = new Set(layers.filter((candidate) => candidate.layerType === 'fill').map((candidate) => candidate.id))
    return [...current.filter((selected) => !fills.has(selected)), id]
  }

  const overlays = current.filter((selected) => layers.find((candidate) => candidate.id === selected)?.layerType !== 'fill')
  return overlays.length < 2 ? [...current, id] : current
}
