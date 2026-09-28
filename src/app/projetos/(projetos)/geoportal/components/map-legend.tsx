"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLayerLegend, LegendItem } from "../lib/layer-styles"
import { getAvailableLayers } from "../lib/city-layers"
import { getModalLegend, type ModalMetric } from "../lib/modal-style"
import demographicMap from "../lib/demographic-map.json"

interface LayerLegendProps {
  layerId: string
  layerName: string
  layerType: 'fill' | 'line' | 'circle' | 'symbol'
  sourceLayer?: string
  metric?: ModalMetric
  legendNote?: string
  recorte?: string
}

// Get legend configuration, preferring layer-styles.ts data
const getLegendConfig = (layerId: string, layerType: string, sourceLayer?: string, metric?: ModalMetric, recorte = ''): LegendItem[] => {
  if (metric) return getModalLegend(metric, recorte)
  // First, try to get legend from layer-styles.ts using sourceLayer
  if (sourceLayer) {
    const autoLegend = getLayerLegend(sourceLayer)
    if (autoLegend && autoLegend.length > 0) {
      return autoLegend
    }
  }

  // Fallback: try with layerId
  const autoLegend = getLayerLegend(layerId)
  if (autoLegend && autoLegend.length > 0) {
    return autoLegend
  }

  // Fallback to default legend for layers without custom styles
  const defaultColors = {
    fill: '#007cbf',
    line: '#007cbf',
    circle: '#007cbf',
    symbol: '#007cbf'
  }

  return [
    {
      color: defaultColors[layerType as keyof typeof defaultColors] || '#007cbf',
      label: 'Dados disponíveis',
      value: 'Ativo'
    }
  ]
}

export function LayerLegend({ layerId, layerName, layerType, sourceLayer, metric, legendNote, recorte }: LayerLegendProps) {
  const legendItems = getLegendConfig(layerId, layerType, sourceLayer, metric, recorte)
  const [dimension, groupId] = recorte?.split(':') ?? []
  const group = dimension && groupId ? demographicMap.dimensions[dimension as keyof typeof demographicMap.dimensions]?.find((item) => item.id === groupId) : undefined

  return (
    <Card className="mb-3 border-none shadow-none">
      <CardHeader className="pb-2 p-0!">
        <CardTitle className="text-sm flex items-center gap-0">
          {layerName}
        </CardTitle>
        {group && <p className="text-xs text-gray-600">Recorte: {group.label}</p>}
        {legendNote && (
          <p className="text-xs text-gray-600 mt-0 mb-2">{legendNote}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-2 p-0!">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className={`flex-shrink-0 ${
                layerType === 'line' ? 'w-6 h-0.5' : 
                layerType === 'circle' ? 'w-4 h-4 rounded-full' :
                'w-4 h-4 rounded-sm border border-gray-400'
              }`}
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              {/* <span className="text-xs font-medium text-gray-700">
                {item.label}
              </span> */}
              {item.value && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {item.value}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

interface MapLegendProps {
  selectedLayers: string[]
  selectedCity: string
  selectedMunicipality?: string
  cityLayersConfig: Record<string, Array<{
    id: string
    name: string
    legendNote?: string
    layerType?: 'fill' | 'line' | 'circle' | 'symbol'
    sourceLayer?: string
    metric?: ModalMetric
  }>>
  recorte?: string
  sideLabel?: string
}

export function MapLegend({ selectedLayers, selectedCity, selectedMunicipality, recorte, sideLabel }: MapLegendProps) {
  const cityLayers = getAvailableLayers(selectedCity, selectedMunicipality)
  const enabledLayers = cityLayers.filter(layer =>
    selectedLayers.includes(layer.id) && layer.layerType
  )

  if (enabledLayers.length === 0) {
    return null
  }

  return (
    <div className="space-y-0">
      {enabledLayers.map((layer) => (
        <LayerLegend
          key={layer.id}
          layerId={layer.id}
          layerName={sideLabel ? `${sideLabel}: ${layer.name}` : layer.name}
          layerType={layer.layerType || 'fill'}
          sourceLayer={layer.sourceLayer}
          metric={layer.metric}
          recorte={recorte}
          legendNote={layer.legendNote}
        />
      ))}
    </div>
  )
}
