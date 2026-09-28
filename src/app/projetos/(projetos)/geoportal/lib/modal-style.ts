import type mapboxgl from 'mapbox-gl'
import modalMap from './modal-map.json' with { type: 'json' }

export type ModalMetric = keyof typeof modalMap.metrics

const noDataColor = '#bdbdbd'

export function getModalMetric(metric: ModalMetric) {
  return modalMap.metrics[metric]
}

export function getModalLayerStyle(id: string, metric: ModalMetric): mapboxgl.FillLayer {
  const { breaks, colors } = getModalMetric(metric)
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
        ['==', ['typeof', ['get', metric]], 'number'],
        ['step', ['get', metric], ...steps],
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

export function getModalLegend(metric: ModalMetric) {
  const { breaks, colors } = getModalMetric(metric)
  const values = [
    `< ${formatBreak(metric, breaks[0])}`,
    ...breaks.slice(1).map((value, index) => `${formatBreak(metric, breaks[index])}–< ${formatBreak(metric, value)}`),
    `≥ ${formatBreak(metric, breaks[breaks.length - 1])}`,
  ]

  return [
    ...colors.map((color, index) => ({ color, label: '', value: values[index] })),
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
