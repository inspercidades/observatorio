import type mapboxgl from 'mapbox-gl'
import modalMap from './modal-map.json' with { type: 'json' }
import demographicMap from './demographic-map.json' with { type: 'json' }

export type ModalMetric = keyof typeof modalMap.metrics

const noDataColor = '#bdbdbd'
const suppressedColor = '#e0e0e0'

export function getModalMetric(metric: ModalMetric) {
  return modalMap.metrics[metric]
}

export function getModalProperty(metric: ModalMetric, recorte = ''): string {
  return recorte ? `${metric}__${recorte.replace(':', '_')}` : metric
}

function getSampleProperty(recorte: string): string {
  return `sample_n__${recorte.replace(':', '_')}`
}

export function getModalLayerStyle(id: string, metric: ModalMetric, recorte = ''): mapboxgl.FillLayer {
  const { breaks, colors } = getModalMetric(metric)
  const property = getModalProperty(metric, recorte)
  const steps: (number | string)[] = [colors[0]]
  breaks.forEach((value, index) => steps.push(value, colors[index + 1]))

  return {
    id,
    type: 'fill',
    source: id,
    'source-layer': 'areas',
    paint: {
      'fill-color': [
        'case',
        ...(recorte ? [['all', ['==', ['typeof', ['get', getSampleProperty(recorte)]], 'number'], ['<', ['get', getSampleProperty(recorte)], demographicMap.minimum_sample]], suppressedColor] : []),
        ['==', ['typeof', ['get', property]], 'number'],
        ['step', ['get', property], ...steps],
        noDataColor,
      ],
      'fill-opacity': 0.8,
      'fill-outline-color': '#444444',
    },
  } as mapboxgl.FillLayer
}

function formatBreak(metric: ModalMetric, value: number): string {
  const { unit } = getModalMetric(metric)
  return unit === 'percent' ? `${Math.round(value * 100)}%` : `${value} min`
}

export function getModalLegend(metric: ModalMetric, recorte = '') {
  const { breaks, colors } = getModalMetric(metric)
  const values = [
    `< ${formatBreak(metric, breaks[0])}`,
    ...breaks.slice(1).map((value, index) => `${formatBreak(metric, breaks[index])}–< ${formatBreak(metric, value)}`),
    `≥ ${formatBreak(metric, breaks[breaks.length - 1])}`,
  ]

  return [
    ...colors.map((color, index) => ({ color, label: '', value: values[index] })),
    ...(recorte ? [{ color: suppressedColor, label: '', value: 'Amostra insuficiente' }] : []),
    { color: noDataColor, label: '', value: 'Sem dados' },
  ]
}

export function formatModalValue(metric: ModalMetric, value: unknown): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Sem dados'

  if (getModalMetric(metric).unit === 'percent') {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 }).format(value)
  }

  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value)} min`
}

export function formatModalFeatureValue(metric: ModalMetric, properties: Record<string, unknown>, recorte = ''): string {
  if (recorte && typeof properties[getSampleProperty(recorte)] !== 'number') return 'Sem dados'
  if (recorte && (properties[getSampleProperty(recorte)] as number) < demographicMap.minimum_sample) {
    return 'Amostra insuficiente'
  }
  return formatModalValue(metric, properties[getModalProperty(metric, recorte)])
}

export function formatProfileMetricValue(metric: ModalMetric, value: unknown, sampleCount: number): string {
  return sampleCount < demographicMap.minimum_sample
    ? 'Amostra insuficiente'
    : formatModalValue(metric, value)
}
