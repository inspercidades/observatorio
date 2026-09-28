import assert from 'node:assert/strict'
import test from 'node:test'

import { getModalLayerStyle, getModalLegend, formatModalValue } from '../src/app/projetos/(projetos)/geoportal/lib/modal-style.ts'
import { toggleLayer } from '../src/app/projetos/(projetos)/geoportal/lib/layer-selection.ts'
import regionManifest from '../src/app/projetos/(projetos)/geoportal/lib/region-manifest.json' with { type: 'json' }
import { getVisibleRegions } from '../src/app/projetos/(projetos)/geoportal/lib/region-selector.ts'

const layers = [
  { id: 'public', layerType: 'fill' },
  { id: 'private', layerType: 'fill' },
  { id: 'rail', layerType: 'line' },
  { id: 'cycle', layerType: 'line' },
  { id: 'stops', layerType: 'circle' },
]

test('one fill replaces another; only two overlays remain active', () => {
  assert.deepEqual(toggleLayer(['public', 'rail'], 'private', layers), ['rail', 'private'])
  assert.deepEqual(toggleLayer(['private', 'rail', 'cycle'], 'stops', layers), ['private', 'rail', 'cycle'])
  assert.deepEqual(toggleLayer(['private', 'rail'], 'rail', layers), ['private'])
})

test('each modal metric has its own expression, classes, and formatting', () => {
  const publicStyle = getModalLayerStyle('onms_share_public', 'share_public')
  const privateStyle = getModalLayerStyle('onms_share_private', 'share_private')
  assert.equal(publicStyle['source-layer'], 'areas')
  assert.match(JSON.stringify(publicStyle.paint['fill-color']), /share_public/)
  assert.match(JSON.stringify(privateStyle.paint['fill-color']), /share_private/)
  assert.equal(getModalLegend('share_public').length, 6)
  assert.equal(getModalLegend('share_public')[0].value, '< 10%')
  assert.equal(getModalLegend('share_private')[0].value, '< 20%')
  assert.equal(formatModalValue('share_public', 0.234), '23,4%')
  assert.equal(formatModalValue('mean_minutes', 32.5), '32,5 min')
  assert.equal(formatModalValue('mean_minutes', null), 'Sem dados')
})

test('the RM manifest preserves IDs, memberships, and map bounds', () => {
  const regions = regionManifest.regions
  assert.equal(regions.length, 86)
  assert.equal(new Set(regions.map((region) => region.id)).size, regions.length)
  assert.equal(regions.reduce((count, region) => count + region.municipalities.length, 0), 1407)
  assert.ok(regions.some((region) => region.name === 'RM de Recife (PE)' && region.municipalities.some((city) => city.name === 'Recife')))
  for (const region of regions) {
    assert.match(region.id, /^\d{5}$/)
    assert.equal(region.bounds.length, 4)
    assert.ok(region.bounds[0] < region.bounds[2] && region.bounds[1] < region.bounds[3])
  }
})

test('region search finds municipalities and keeps the active RM first', () => {
  const carbonifera = regionManifest.regions.find((region) => region.name === 'RM Carbonífera (SC)')
  assert.ok(carbonifera)
  assert.equal(getVisibleRegions('', carbonifera.id)[0].id, carbonifera.id)
  assert.ok(getVisibleRegions('carbonifera', '').some((region) => region.id === carbonifera.id))
  assert.ok(getVisibleRegions('criciuma', '').some((region) => region.id === carbonifera.id))
})
