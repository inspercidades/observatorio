"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface MapPopupProps {
  feature: mapboxgl.MapboxGeoJSONFeature
  layerName: string
  onClose: () => void
}

export function MapPopup({ feature, layerName, onClose }: MapPopupProps) {
  const properties = feature.properties || {}
  
  // Format property values for display
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value === 'number') {
      // Format numbers with appropriate precision
      if (Number.isInteger(value)) {
        return value.toLocaleString()
      }
      return value.toFixed(2)
    }
    return String(value)
  }

  // Get the most relevant properties to display
  const getDisplayProperties = () => {
    const relevantProps = Object.entries(properties)
      .filter(([key, value]) => {
        // Filter out common non-relevant properties
        const excludeKeys = ['id', 'geometry', 'type', 'coordinates']
        return !excludeKeys.includes(key.toLowerCase()) && 
               value !== null && 
               value !== undefined &&
               value !== ''
      })
      .slice(0, 8) // Limit to 8 properties to avoid overwhelming the popup
    
    return relevantProps
  }

  const displayProperties = getDisplayProperties()

  if (displayProperties.length === 0) {
    return null
  }

  return (
    <Card >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          {layerName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {displayProperties.map(([key, value]) => (
          <div key={key} className="flex justify-between items-start gap-2">
            <span className="text-xs font-medium text-gray-600 capitalize">
              {key.replace(/_/g, ' ')}:
            </span>
            <Badge variant="secondary" className="text-xs">
              {formatValue(value)}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
