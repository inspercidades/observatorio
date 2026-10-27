import { describe, expect, it } from 'vitest'
import { createHash } from 'node:crypto'
import { cityLayersConfig } from './city-layers'
import { getLayerStyle } from './layer-styles'

const expected = [
  ['renda-rio-4ks1k8', 'rio'],
  ['renda-rec-bcpy1l', 'rec'],
  ['renda-42uz5h', 'bhe'],
  ['renda_goi-8q2sqk', 'goi'],
  ['frt_income_hh-26qfm4', 'frt'],
  ['renda-987gzt', 'nit'],
  ['renda_sad-a9kjjx', 'sad'],
  ['renda_ssa-72km6n', 'ssa'],
  ['renda-2bxm7u', 'cam'],
  ['cur_income_hh-b297ww', 'cur'],
  ['renda_poa-0cq519', 'poa'],
  ['renda_spo-ddwghj', 'spo'],
] as const

describe('2022 income website contract', () => {
  it('updates exactly the twelve existing income layer IDs and styles', () => {
    const layers = Object.values(cityLayersConfig).flat()
    expect(layers).toHaveLength(44)

    for (const [id, city] of expected) {
      const layer = layers.find(item => item.id === id)
      expect(layer).toBeDefined()
      expect(layer?.sourceLayer).toBe(`renda_responsavel_2022_${city}`)
      expect(layer?.tilesetId).toMatch(
        new RegExp(`^observatorio-nacional\\.${id.slice(0, 19)}_[0-9a-f]{12}$`),
      )
      expect(layer?.name).toContain('responsável com rendimento')
      expect(layer?.description).toContain('2022')
      expect(layer?.description).toContain('nominais')
      expect(layer?.description).not.toContain('2010')

      const style = getLayerStyle(layer!.sourceLayer!)
      expect(style?.type).toBe('fill')
      expect(style?.['source-layer']).toBe(layer?.sourceLayer)
      expect(JSON.stringify(style?.paint)).toContain('renda_media_responsavel_2022')
      expect(JSON.stringify(style?.paint)).toContain('rendimento_status')
    }

    expect(layers.filter(item => item.sourceLayer?.startsWith('renda_responsavel_2022_'))).toHaveLength(12)
    const incomeIds = new Set<string>(expected.map(([id]) => id))
    const unchanged = layers.filter(item => !incomeIds.has(item.id))
    expect(unchanged).toHaveLength(32)
    expect(createHash('sha256').update(JSON.stringify(unchanged)).digest('hex')).toBe(
      '27e902c617e6cfd6d0193203fbffdaa77602ae1b244170ab0a97e03e3795551d',
    )
  })
})
