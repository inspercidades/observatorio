"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeftIcon, Compass, Layers, Menu, Minus, Plus, X } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { cityLayersConfig } from "../lib/city-layers"
import { createStyledLayer } from "../lib/layer-styles"
import { CityAccordion } from "./city-accordion"
import { CityLayers } from "./city-layers"
import { CityLayersComparison } from "./city-layers-comparison"
import { CollapsibleLegend } from "./collapsible-legend"

// Dynamic import for mapbox-gl-compare to avoid SSR issues
type MapboxCompareInstance = {
  setSlider: (slider: number) => void
  on: (event: string, callback: () => void) => void
  off: (event: string, callback: () => void) => void
  remove: () => void
}

let mapboxglCompare: (new (
  before: mapboxgl.Map,
  after: mapboxgl.Map,
  container: HTMLElement,
  options?: { orientation?: 'vertical' | 'horizontal'; mousemove?: boolean; touchmove?: boolean }
) => MapboxCompareInstance) | null = null
if (typeof window !== 'undefined') {
  import('mapbox-gl-compare').then(module => {
    mapboxglCompare = module.default
  })
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// Helper function to create default layer configuration
function createDefaultLayerConfig(layerId: string, layerConfig: { layerType?: 'fill' | 'line' | 'circle' | 'symbol'; sourceLayer: string }): mapboxgl.AnyLayer {
  const layerType = layerConfig.layerType || 'fill'
  const defaultOpacity = 0.8 // 80% opacity as default
  
  let paint: Record<string, unknown> = {}
  
  if (layerType === 'fill') {
    paint = {
      'fill-color': '#007cbf',
      'fill-opacity': defaultOpacity,
      'fill-outline-color': '#000',
      'fill-outline-width': 1
    }
  } else if (layerType === 'line') {
    paint = {
      'line-color': '#007cbf',
      'line-opacity': defaultOpacity,
      'line-width': 2
    }
  } else if (layerType === 'circle') {
    paint = {
      'circle-color': '#007cbf',
      'circle-opacity': defaultOpacity,
      'circle-radius': 5
    }
  } else if (layerType === 'symbol') {
    paint = {
      'text-color': '#007cbf',
      'text-opacity': defaultOpacity,
      'icon-opacity': defaultOpacity
    }
  }
  
  return {
    id: layerId,
    type: layerType as 'fill' | 'line' | 'circle' | 'symbol',
    source: layerId,
    'source-layer': layerConfig.sourceLayer,
    layout: {
      visibility: 'visible'
    },
    paint
  } as mapboxgl.AnyLayer
}

const cityCoordinates: Record<string, [number, number]> = {
  "Brasil": [-53.97005, -13.69895], // Center of Brazil
  "São Paulo": [-46.6388, -23.5505],
  "Rio de Janeiro": [-43.43852, -22.91464],
  "Belo Horizonte": [-43.9388, -19.9167],
  "Fortaleza": [-38.508, -3.777],
  "Curitiba": [-49.293, -25.500],
  "Niteroi": [-43.12084, -22.89277],
  "Santo André": [-46.52735, -23.65600],
  "Salvador": [-38.51101, -12.97162],
  "Recife": [-34.87722, -8.05556],
  "Porto Alegre": [-51.2177, -30.0326],
  "Campinas": [-47.05887, -22.89959],
  "Goiânia": [-49.333, -16.631]
}

const cityZoomLevels: Record<string, number> = {
  "Brasil": 3.5,
  "São Paulo": 10.5,
  "Rio de Janeiro": 10.5,
  "Belo Horizonte": 11,
  "Fortaleza": 11,
  "Curitiba": 11,
  "Niteroi": 12,
  "Santo André": 12,
  "Salvador": 11,
  "Recife": 11.5,
  "Porto Alegre": 11,
  "Campinas": 11.5,
  "Goiânia": 11
}

export default function PropertyMap() {
  const router = useRouter()
  const mapContainer = useRef<HTMLDivElement>(null)
  const beforeMapContainer = useRef<HTMLDivElement>(null)
  const afterMapContainer = useRef<HTMLDivElement>(null)
  const comparisonContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const beforeMap = useRef<mapboxgl.Map | null>(null)
  const afterMap = useRef<mapboxgl.Map | null>(null)
  const compare = useRef<MapboxCompareInstance | null>(null)
  const [zoom] = useState(10.5)
  const [selectedCity, setSelectedCity] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [isComparisonMode, setIsComparisonMode] = useState(false)
  const [selectedLayer1, setSelectedLayer1] = useState<string | null>(null)
  const [selectedLayer2, setSelectedLayer2] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [layerLoadingStates, setLayerLoadingStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({})
  const [mapTheme, setMapTheme] = useState<'dark' | 'light'>('dark')
  const [layerOpacities, setLayerOpacities] = useState<Record<string, number>>({})
  const [, setHoveredFeature] = useState<{
    feature: mapboxgl.MapboxGeoJSONFeature
    layerName: string
    coordinates: [number, number]
  } | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const eventHandlersRef = useRef<Map<string, { mouseenter: () => void; mouseleave: () => void; mousemove: (e: mapboxgl.MapLayerMouseEvent) => void }>>(new Map())
  
  // Function to add hover handlers for a layer
  const addHoverHandlers = (layerId: string, layerName: string, targetMap?: mapboxgl.Map) => {
    const mapInstance = targetMap || map.current
    if (!mapInstance) return

    // Create event handler functions
    const mouseenterHandler = () => {
      if (mapInstance) {
        mapInstance.getCanvas().style.cursor = 'pointer'
      }
    }

    const mouseleaveHandler = () => {
      if (mapInstance) {
        mapInstance.getCanvas().style.cursor = ''
      }
      // Remove popup when mouse leaves
      if (popupRef.current) {
        popupRef.current.remove()
        popupRef.current = null
      }
      setHoveredFeature(null)
    }

    const mousemoveHandler = (e: mapboxgl.MapLayerMouseEvent) => {
      if (!mapInstance || !e.features || e.features.length === 0) return

      const feature = e.features[0]
      const coordinates = e.lngLat.toArray() as [number, number]

      // Remove existing popup
      if (popupRef.current) {
        popupRef.current.remove()
      }

      // Check if there are any properties to display
      const displayProperties = Object.entries(feature.properties || {})
        .filter(([key, value]) => {
          const excludeKeys = ['id', 'geometry', 'type', 'coordinates']
          return !excludeKeys.includes(key.toLowerCase()) &&
                 value !== null &&
                 value !== undefined &&
                 value !== ''
        })
        .slice(0, 8)

      // Only create popup if there are properties to display
      if (displayProperties.length === 0) {
        setHoveredFeature(null)
        return
      }

      // Create new popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '400px'
      })

      // Create popup content
      const popupContent = document.createElement('div')
      popupContent.innerHTML = `
        <div class="p-2 min-w-50">
          <h3 class="font-semibold text-sm mb-2">${layerName}</h3>
          <div class="space-y-1 overflow-y-auto">
            ${displayProperties
              .map(([key, value]) => {
                const formattedValue = typeof value === 'number'
                  ? (Number.isInteger(value) ? value.toLocaleString() : value.toFixed(2))
                  : String(value)
                return `
                  <div class="flex justify-between items-center text-xs">
                    <span class="font-medium text-gray-600 capitalize">${key.replace(/_/g, ' ')}:</span>
                    <span class="bg-gray-100 px-2 py-1 rounded text-gray-800">${formattedValue}</span>
                  </div>
                `
              }).join('')}
          </div>
        </div>
      `

      popup.setLngLat(coordinates)
        .setDOMContent(popupContent)
        .addTo(mapInstance)

      popupRef.current = popup
      setHoveredFeature({ feature, layerName, coordinates })
    }

    // Store handlers for later removal
    eventHandlersRef.current.set(layerId, {
      mouseenter: mouseenterHandler,
      mouseleave: mouseleaveHandler,
      mousemove: mousemoveHandler
    })

    // Add event listeners
    mapInstance.on('mouseenter', layerId, mouseenterHandler)
    mapInstance.on('mouseleave', layerId, mouseleaveHandler)
    mapInstance.on('mousemove', layerId, mousemoveHandler)
  }

  // Function to remove hover handlers for a layer
  const removeHoverHandlers = (layerId: string, targetMap?: mapboxgl.Map) => {
    const mapInstance = targetMap || map.current
    if (!mapInstance) return

    const handlers = eventHandlersRef.current.get(layerId)
    if (handlers) {
      // Remove event listeners using the stored handler functions
      mapInstance.off('mouseenter', layerId, handlers.mouseenter)
      mapInstance.off('mouseleave', layerId, handlers.mouseleave)
      mapInstance.off('mousemove', layerId, handlers.mousemove)
      
      // Remove from stored handlers
      eventHandlersRef.current.delete(layerId)
    }
  }

  // Function to update layer opacity
  const updateLayerOpacity = (layerId: string, opacity: number, targetMap?: mapboxgl.Map) => {
    const mapInstance = targetMap || map.current
    if (!mapInstance || !mapInstance.getLayer(layerId)) return

    const layer = mapInstance.getLayer(layerId)
    if (!layer) return

    const opacityValue = opacity / 100 // Convert percentage to 0-1 range

    try {
      // Update fill-opacity for fill layers
      if (layer.type === 'fill') {
        mapInstance.setPaintProperty(layerId, 'fill-opacity', opacityValue)
      }
      // Update line-opacity for line layers
      else if (layer.type === 'line') {
        mapInstance.setPaintProperty(layerId, 'line-opacity', opacityValue)
      }
      // Update circle-opacity for circle layers
      else if (layer.type === 'circle') {
        mapInstance.setPaintProperty(layerId, 'circle-opacity', opacityValue)
      }
      // Update text-opacity for symbol layers
      else if (layer.type === 'symbol') {
        mapInstance.setPaintProperty(layerId, 'text-opacity', opacityValue)
        mapInstance.setPaintProperty(layerId, 'icon-opacity', opacityValue)
      }
      
      console.log(`Updated opacity for layer ${layerId} to ${opacity}%`)
    } catch (error) {
      console.error(`Error updating opacity for layer ${layerId}:`, error)
    }
  }

  // Function to handle opacity changes
  const handleOpacityChange = (layerId: string, opacity: number) => {
    console.log(`handleOpacityChange called: layerId=${layerId}, opacity=${opacity}, isComparisonMode=${isComparisonMode}`)
    setLayerOpacities(prev => ({ ...prev, [layerId]: opacity }))
    
    if (isComparisonMode) {
      // In comparison mode, update opacity on the map that contains the layer
      if (beforeMap.current && beforeMap.current.getLayer(layerId)) {
        console.log(`Updating opacity for layer ${layerId} on beforeMap`)
        updateLayerOpacity(layerId, opacity, beforeMap.current)
      }
      if (afterMap.current && afterMap.current.getLayer(layerId)) {
        console.log(`Updating opacity for layer ${layerId} on afterMap`)
        updateLayerOpacity(layerId, opacity, afterMap.current)
      }
    } else {
      // In normal mode, update opacity on the main map
      updateLayerOpacity(layerId, opacity)
    }
  }

  // Zoom in functionality
  const handleZoomIn = () => {
    if (isComparisonMode) {
      if (beforeMap.current) {
        beforeMap.current.zoomIn()
      }
      if (afterMap.current) {
        afterMap.current.zoomIn()
      }
    } else {
      if (map.current) {
        map.current.zoomIn()
      }
    }
  }

  // Zoom out functionality
  const handleZoomOut = () => {
    if (isComparisonMode) {
      if (beforeMap.current) {
        beforeMap.current.zoomOut()
      }
      if (afterMap.current) {
        afterMap.current.zoomOut()
      }
    } else {
      if (map.current) {
        map.current.zoomOut()
      }
    }
  }

  // Helper function for recenter with pitch and bearing reset
  const safeFlyToWithReset = (mapInstance: mapboxgl.Map, center: [number, number], zoom: number) => {
    const executeFly = () => {
      mapInstance.flyTo({
        center,
        zoom,
        pitch: 0, // Reset to flat view
        bearing: 0, // Reset to north-up orientation
        duration: 2000,
        essential: true
      })
    }

    // Check if map is loaded and style is loaded
    if (mapInstance.loaded() && mapInstance.isStyleLoaded()) {
      executeFly()
    } else {
      // Wait for the map to be ready
      const onLoad = () => {
        executeFly()
        mapInstance.off('load', onLoad)
        mapInstance.off('idle', onLoad)
      }
      
      // Listen to both load and idle events
      mapInstance.once('load', onLoad)
      mapInstance.once('idle', onLoad)
    }
  }

  // Recenter map functionality
  const handleRecenter = () => {
    const targetCity = selectedCity || "Brasil"
    const center = cityCoordinates[targetCity]
    const zoomLevel = cityZoomLevels[targetCity]

    if (isComparisonMode) {
      if (beforeMap.current) {
        safeFlyToWithReset(beforeMap.current, center, zoomLevel)
      }
      if (afterMap.current) {
        safeFlyToWithReset(afterMap.current, center, zoomLevel)
      }
    } else {
      if (map.current) {
        safeFlyToWithReset(map.current, center, zoomLevel)
      }
    }
  }

  // Function to re-add all active layers to a map
  const reAddLayers = (mapInstance: mapboxgl.Map, layersToAdd: string[]) => {
    const targetCity = selectedCity || "Brasil"
    const cityLayers = cityLayersConfig[targetCity] || []

    layersToAdd.forEach(layerId => {
      const layerConfig = cityLayers.find(l => l.id === layerId)
      if (layerConfig?.tilesetId && layerConfig?.sourceLayer) {
        try {
          // Add source
          if (!mapInstance.getSource(layerId)) {
            mapInstance.addSource(layerId, {
              type: 'vector',
              url: `mapbox://${layerConfig.tilesetId}`
            })
          }

          // Try to use custom style first, fallback to default
          let layerConfigToAdd: mapboxgl.AnyLayer

          const customStyle = createStyledLayer(layerId, layerConfig.sourceLayer, layerConfig.tilesetId)
          if (customStyle) {
            layerConfigToAdd = {
              ...customStyle,
              layout: {
                ...customStyle.layout,
                visibility: 'visible'
              }
            }
          } else {
            layerConfigToAdd = createDefaultLayerConfig(layerId, {
              layerType: layerConfig.layerType,
              sourceLayer: layerConfig.sourceLayer
            })
          }

          // Add layer
          if (!mapInstance.getLayer(layerId)) {
            mapInstance.addLayer(layerConfigToAdd)
          }

          // Re-add hover handlers
          addHoverHandlers(layerId, layerConfig.name, mapInstance)

          // Restore opacity
          const opacity = layerOpacities[layerId] ?? 80
          updateLayerOpacity(layerId, opacity, mapInstance)

          console.log(`Re-added layer ${layerId} after style change`)
        } catch (error) {
          console.error(`Error re-adding layer ${layerId}:`, error)
        }
      }
    })
  }

  // Toggle map theme functionality
  const handleThemeToggle = () => {
    const newTheme = mapTheme === 'dark' ? 'light' : 'dark'
    const newStyle = newTheme === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/observatorio-nacional/cmhrp434x002301s23n36fphx"

    setMapTheme(newTheme)

    if (isComparisonMode) {
      // Handle comparison mode
      const handleBeforeStyleLoad = () => {
        if (selectedLayer1 && beforeMap.current) {
          reAddLayers(beforeMap.current, [selectedLayer1])
        }
      }

      const handleAfterStyleLoad = () => {
        if (selectedLayer2 && afterMap.current) {
          reAddLayers(afterMap.current, [selectedLayer2])
        }
      }

      if (beforeMap.current) {
        beforeMap.current.once('style.load', handleBeforeStyleLoad)
        beforeMap.current.setStyle(newStyle)
      }
      if (afterMap.current) {
        afterMap.current.once('style.load', handleAfterStyleLoad)
        afterMap.current.setStyle(newStyle)
      }
    } else {
      // Handle normal mode
      const handleStyleLoad = () => {
        if (map.current && selectedLayers.length > 0) {
          reAddLayers(map.current, selectedLayers)
        }
      }

      if (map.current) {
        map.current.once('style.load', handleStyleLoad)
        map.current.setStyle(newStyle)
      }
    }
  }

  // Initialize single map
  useEffect(() => {
    if (!mapContainer.current || isComparisonMode) return

    const initialCity = selectedCity || "Brasil"
    const initialCenter = cityCoordinates[initialCity]
    const initialZoom = cityZoomLevels[initialCity]

    const mapStyle = mapTheme === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/observatorio-nacional/cmhrp434x002301s23n36fphx"

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: initialCenter,
      zoom: initialZoom,
    })
    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, isComparisonMode])

  // Initialize comparison maps
  useEffect(() => {
    if (!isComparisonMode || !beforeMapContainer.current || !afterMapContainer.current || !comparisonContainer.current) return

    // Clean up existing maps
    if (beforeMap.current) beforeMap.current.remove()
    if (afterMap.current) afterMap.current.remove()
    if (compare.current) compare.current.remove()

    const initialCity = selectedCity || "Brasil"
    const initialCenter = cityCoordinates[initialCity]
    const initialZoom = cityZoomLevels[initialCity]

    const mapStyle = mapTheme === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/observatorio-nacional/cmhrp434x002301s23n36fphx"

    beforeMap.current = new mapboxgl.Map({
      container: beforeMapContainer.current,
      style: mapStyle,
      center: initialCenter,
      zoom: initialZoom,
    })

    afterMap.current = new mapboxgl.Map({
      container: afterMapContainer.current,
      style: mapStyle,
      center: initialCenter,
      zoom: initialZoom,
    })

    // Initialize comparison with dynamic import
    const initializeComparison = async () => {
      if (!mapboxglCompare) {
        const compareModule = await import('mapbox-gl-compare')
        mapboxglCompare = compareModule.default
      }
      
      const isMobile = window.innerWidth < 768 // md breakpoint
      compare.current = new mapboxglCompare(
        beforeMap.current!,
        afterMap.current!,
        comparisonContainer.current!,
        {
          orientation: isMobile ? 'horizontal' : 'vertical',
          // mousemove: true,
          // touchmove: true
        }
      )
    }

    initializeComparison()

    // Set map loaded when both maps are ready
    let mapsLoaded = 0
    const onMapLoad = () => {
      mapsLoaded++
      if (mapsLoaded === 2) {
        setMapLoaded(true)
      }
    }

    beforeMap.current.on('load', onMapLoad)
    afterMap.current.on('load', onMapLoad)

    // Handle window resize to update orientation
    const isMobile = window.innerWidth < 768 // md breakpoint
    let currentOrientation = isMobile ? 'horizontal' : 'vertical'
    const handleResize = async () => {
      if (compare.current) {
        const isMobileResize = window.innerWidth < 768
        const newOrientation = isMobileResize ? 'horizontal' : 'vertical'
        
        // Only update if orientation changed
        if (currentOrientation !== newOrientation) {
          currentOrientation = newOrientation
          compare.current.remove()
          
          // Ensure mapboxglCompare is loaded
          if (!mapboxglCompare) {
            const compareModule = await import('mapbox-gl-compare')
            mapboxglCompare = compareModule.default
          }
          
          compare.current = new mapboxglCompare(
            beforeMap.current!,
            afterMap.current!,
            comparisonContainer.current!,
            {
              orientation: newOrientation,
            }
          )
        }
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (compare.current) {
        compare.current.remove()
        compare.current = null
      }
      if (beforeMap.current) {
        beforeMap.current.remove()
        beforeMap.current = null
      }
      if (afterMap.current) {
        afterMap.current.remove()
        afterMap.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, isComparisonMode])

  // Add layers when comparison maps are loaded and layers are selected
  useEffect(() => {
    if (!isComparisonMode || !mapLoaded || !beforeMap.current || !afterMap.current) return

    // Add layer1 if selected
    if (selectedLayer1) {
      const targetCity = selectedCity || "Brasil"
      const cityLayers = cityLayersConfig[targetCity] || []
      const layerConfig = cityLayers.find(l => l.id === selectedLayer1)

      if (layerConfig?.tilesetId && layerConfig?.sourceLayer && !beforeMap.current.getLayer(selectedLayer1)) {
        console.log(`Adding layer1 to comparison map: ${selectedLayer1}`)
        handleComparisonLayerChange(selectedLayer1, true)
      }
    }

    // Add layer2 if selected
    if (selectedLayer2) {
      const targetCity = selectedCity || "Brasil"
      const cityLayers = cityLayersConfig[targetCity] || []
      const layerConfig = cityLayers.find(l => l.id === selectedLayer2)

      if (layerConfig?.tilesetId && layerConfig?.sourceLayer && !afterMap.current.getLayer(selectedLayer2)) {
        console.log(`Adding layer2 to comparison map: ${selectedLayer2}`)
        handleComparisonLayerChange(selectedLayer2, false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComparisonMode, mapLoaded, selectedLayer1, selectedLayer2])

  // Add layers when normal map is loaded and layers are selected
  useEffect(() => {
    if (isComparisonMode || !mapLoaded || !map.current) return

    // Add all selected layers
    if (selectedLayers.length > 0) {
      const targetCity = selectedCity || "Brasil"
      const cityLayers = cityLayersConfig[targetCity] || []

      selectedLayers.forEach(layerId => {
        const layerConfig = cityLayers.find(l => l.id === layerId)
        if (layerConfig?.tilesetId && layerConfig?.sourceLayer && !map.current?.getLayer(layerId)) {
          console.log(`Adding layer to normal map after mode switch: ${layerId}`)

          try {
            // Add source
            map.current!.addSource(layerId, {
              type: 'vector',
              url: `mapbox://${layerConfig.tilesetId}`
            })

            // Try to use custom style first, fallback to default
            let layerConfigToAdd: mapboxgl.AnyLayer

            const customStyle = createStyledLayer(layerId, layerConfig.sourceLayer, layerConfig.tilesetId)
            if (customStyle) {
              layerConfigToAdd = {
                ...customStyle,
                layout: {
                  ...customStyle.layout,
                  visibility: 'visible'
                }
              }
            } else {
              layerConfigToAdd = createDefaultLayerConfig(layerId, {
                layerType: layerConfig.layerType,
                sourceLayer: layerConfig.sourceLayer
              })
            }

            map.current!.addLayer(layerConfigToAdd)

            // Add hover functionality
            addHoverHandlers(layerId, layerConfig.name, map.current!)

            // Set default opacity
            const opacity = layerOpacities[layerId] ?? 80
            updateLayerOpacity(layerId, opacity, map.current!)

            // Set loading state
            setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loaded' }))
          } catch (error) {
            console.error(`Error adding layer ${layerId} after mode switch:`, error)
            setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'error' }))
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComparisonMode, mapLoaded])

  // Helper function to safely execute flyTo when map is ready
  const safeFlyTo = (mapInstance: mapboxgl.Map, center: [number, number], zoom: number) => {
    const executeFly = () => {
      mapInstance.flyTo({
        center,
        zoom,
        duration: 2000,
        essential: true
      })
    }

    // Check if map is loaded and style is loaded
    if (mapInstance.loaded() && mapInstance.isStyleLoaded()) {
      executeFly()
    } else {
      // Wait for the map to be ready
      const onLoad = () => {
        executeFly()
        mapInstance.off('load', onLoad)
        mapInstance.off('idle', onLoad)
      }
      
      // Listen to both load and idle events
      mapInstance.once('load', onLoad)
      mapInstance.once('idle', onLoad)
    }
  }

  const handleCityChange = (city: string) => {
    // Reset selected layers when changing city
    setSelectedLayers([])
    setSelectedLayer1(null)
    setSelectedLayer2(null)
    // Reset layer opacities when changing city
    setLayerOpacities({})

    // Clear all layers when changing city
    clearAllLayers()

    // Determine target location - Brasil if no city selected
    const targetCity = city || "Brasil"
    const targetCenter = cityCoordinates[targetCity]
    const targetZoom = cityZoomLevels[targetCity]

    // Fly to new location on the appropriate map(s)
    if (isComparisonMode) {
      if (beforeMap.current) {
        safeFlyTo(beforeMap.current, targetCenter, targetZoom)
      }
      if (afterMap.current) {
        safeFlyTo(afterMap.current, targetCenter, targetZoom)
      }
    } else {
      if (map.current) {
        safeFlyTo(map.current, targetCenter, targetZoom)
      }
    }

    // Update state
    setSelectedCity(city)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleComparisonMode = () => {
    if (!isComparisonMode) {
      // Switching to comparison mode - clear all layers
      clearAllLayers()
      setIsComparisonMode(true)
      setMapLoaded(false) // Reset map loaded state

      // Start with no layers selected
      setSelectedLayer1(null)
      setSelectedLayer2(null)
      setSelectedLayers([])

      // Show success toast
      toast.success("Modo de Comparação Ativado", {
        description: "Selecione 2 camadas diferentes para comparação",
        duration: 4000,
      })
    } else {
      // Switching back to normal mode - clear all layers
      clearAllLayers()
      setIsComparisonMode(false)
      setMapLoaded(false) // Reset map loaded state

      // Start with no layers selected
      setSelectedLayers([])
      setSelectedLayer1(null)
      setSelectedLayer2(null)

      // Show info toast
      toast.info("Modo de Comparação Desativado", {
        description: "Voltando ao modo normal de visualização",
        duration: 3000,
      })
    }
  }

  const clearAllLayers = () => {
    const targetCity = selectedCity || "Brasil"
    const cityLayers = cityLayersConfig[targetCity] || []
    
    // Clear single map layers
    if (map.current && mapLoaded) {
      cityLayers.forEach(layer => {
        if (layer.tilesetId && map.current?.getLayer(layer.id)) {
          removeHoverHandlers(layer.id, map.current)
          map.current.removeLayer(layer.id)
        }
        if (layer.tilesetId && map.current?.getSource(layer.id)) {
          map.current.removeSource(layer.id)
        }
      })
    }
    
    // Clear comparison map layers
    if (beforeMap.current && afterMap.current && mapLoaded) {
      cityLayers.forEach(layer => {
        if (layer.tilesetId) {
          // Clear from before map
          if (beforeMap.current?.getLayer(layer.id)) {
            removeHoverHandlers(layer.id, beforeMap.current)
            beforeMap.current.removeLayer(layer.id)
          }
          if (beforeMap.current?.getSource(layer.id)) {
            beforeMap.current.removeSource(layer.id)
          }
          
          // Clear from after map
          if (afterMap.current?.getLayer(layer.id)) {
            removeHoverHandlers(layer.id, afterMap.current)
            afterMap.current.removeLayer(layer.id)
          }
          if (afterMap.current?.getSource(layer.id)) {
            afterMap.current.removeSource(layer.id)
          }
        }
      })
    }
    
    // Reset all states
    setLayerLoadingStates({})
    setLayerOpacities({})
    
    // Clear popup
    if (popupRef.current) {
      popupRef.current.remove()
      popupRef.current = null
    }
    setHoveredFeature(null)
  }

  const handleLayer1Change = (layerId: string | null) => {
    // Remove previous layer first if exists
    if (selectedLayer1 && beforeMap.current && afterMap.current && mapLoaded) {
      removeComparisonLayer(selectedLayer1)
    }
    
    setSelectedLayer1(layerId)
    
    // Add new layer if provided
    if (layerId) {
      handleComparisonLayerChange(layerId, true)
    }
  }

  const handleLayer2Change = (layerId: string | null) => {
    // Remove previous layer first if exists
    if (selectedLayer2 && beforeMap.current && afterMap.current && mapLoaded) {
      removeComparisonLayer(selectedLayer2)
    }
    
    setSelectedLayer2(layerId)
    
    // Add new layer if provided
    if (layerId) {
      handleComparisonLayerChange(layerId, false)
    }
  }

  const handleComparisonLayerChange = (layerId: string, isLayer1: boolean) => {
    if (!beforeMap.current || !afterMap.current || !mapLoaded) return
    
    const targetCity = selectedCity || "Brasil"
    const cityLayers = cityLayersConfig[targetCity] || []
    const layerConfig = cityLayers.find(l => l.id === layerId)
    
    if (layerConfig?.tilesetId && layerConfig?.sourceLayer) {
      console.log(`Adding comparison layer: ${layerId}`, { isLayer1, tilesetId: layerConfig.tilesetId, sourceLayer: layerConfig.sourceLayer })
      
      // Set loading state
      setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loading' }))
      
      try {
        // Determine target map
        const targetMap = isLayer1 ? beforeMap.current : afterMap.current
        
        // Add source
        targetMap!.addSource(layerId, {
          type: 'vector',
          url: `mapbox://${layerConfig.tilesetId}`
        })
        
        // Try to use custom style first, fallback to default
        let layerConfigToAdd: mapboxgl.AnyLayer

        // Always try to get custom style first
        const customStyle = createStyledLayer(layerId, layerConfig.sourceLayer, layerConfig.tilesetId)
        if (customStyle) {
          layerConfigToAdd = {
            ...customStyle,
            layout: {
              ...customStyle.layout,
              visibility: 'visible'
            }
          }
          console.log(`Using custom style for comparison layer: ${layerId}`)
        } else {
          // Fallback to default style if custom style not found
          layerConfigToAdd = createDefaultLayerConfig(layerId, {
            layerType: layerConfig.layerType,
            sourceLayer: layerConfig.sourceLayer
          })
          console.log(`Custom style not found, using default for comparison layer: ${layerId}`)
        }
        
        targetMap!.addLayer(layerConfigToAdd)
        
        // Add hover functionality for this layer
        addHoverHandlers(layerId, layerConfig.name, targetMap)
        
        // Set default opacity for the layer
        const defaultOpacity = 80
        setLayerOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
        updateLayerOpacity(layerId, defaultOpacity, targetMap)
        
        console.log(`Successfully added comparison layer: ${layerId}`)
        
        // Set loaded state
        setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loaded' }))
        
      } catch (error) {
        console.error(`Error adding comparison layer ${layerId}:`, error)
        setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'error' }))
      }
    }
  }

  const removeComparisonLayer = (layerId: string) => {
    if (!beforeMap.current || !afterMap.current || !mapLoaded) return

    const targetCity = selectedCity || "Brasil"
    const cityLayers = cityLayersConfig[targetCity] || []
    const layerConfig = cityLayers.find(l => l.id === layerId)
    
    if (layerConfig?.tilesetId) {
      console.log(`Removing comparison layer: ${layerId}`)
      
      // Remove from both maps
      const mapsToClean = [beforeMap.current, afterMap.current]
      for (const mapInstance of mapsToClean) {
        if (mapInstance) {
          // Remove hover handlers first
          removeHoverHandlers(layerId, mapInstance)
          
          if (mapInstance.getLayer(layerId)) {
            mapInstance.removeLayer(layerId)
          }
          if (mapInstance.getSource(layerId)) {
            mapInstance.removeSource(layerId)
          }
        }
      }
      
      // Update loading state
      setLayerLoadingStates(prev => {
        const newState = { ...prev }
        delete newState[layerId]
        return newState
      })
      
      // Remove opacity
      setLayerOpacities(prev => {
        const newState = { ...prev }
        delete newState[layerId]
        return newState
      })
    }
  }

  const handleLayersChange = (layers: string[]) => {
    if (!map.current || !mapLoaded) return
    
    const targetCity = selectedCity || "Brasil"
    console.log('Handling layers change:', { previous: selectedLayers, new: layers, city: targetCity })
    
    const cityLayers = cityLayersConfig[targetCity] || []
    const previousLayers = selectedLayers
    const newLayers = layers
    
    // Remove layers that are no longer selected
    previousLayers.forEach(layerId => {
      if (!newLayers.includes(layerId)) {
        const layerConfig = cityLayers.find(l => l.id === layerId)
        if (layerConfig?.tilesetId) {
          console.log(`Removing layer: ${layerId}`)
          
          // Remove hover handlers first
          removeHoverHandlers(layerId, map.current!)
          
          if (map.current?.getLayer(layerId)) {
            map.current.removeLayer(layerId)
          }
          if (map.current?.getSource(layerId)) {
            map.current.removeSource(layerId)
          }
          // Update loading state
          setLayerLoadingStates(prev => {
            const newState = { ...prev }
            delete newState[layerId]
            return newState
          })
          // Remove opacity state
          setLayerOpacities(prev => {
            const newState = { ...prev }
            delete newState[layerId]
            return newState
          })
        }
      }
    })
    
    // Add new layers that are now selected
    newLayers.forEach(layerId => {
      if (!previousLayers.includes(layerId)) {
        const layerConfig = cityLayers.find(l => l.id === layerId)
        if (layerConfig?.tilesetId && layerConfig?.sourceLayer) {
          console.log(`Adding layer: ${layerId}`, { tilesetId: layerConfig.tilesetId, sourceLayer: layerConfig.sourceLayer })
          
          // Set loading state
          setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loading' }))
          
          try {
            // Add source
            map.current!.addSource(layerId, {
              type: 'vector',
              url: `mapbox://${layerConfig.tilesetId}`
            })
            
            // Try to use custom style first, fallback to default
            let layerConfigToAdd: mapboxgl.AnyLayer

            // Always try to get custom style first
            const customStyle = createStyledLayer(layerId, layerConfig.sourceLayer, layerConfig.tilesetId)
            if (customStyle) {
              layerConfigToAdd = {
                ...customStyle,
                layout: {
                  ...customStyle.layout,
                  visibility: 'visible'
                }
              }
              console.log(`Using custom style for layer: ${layerId}`)
            } else {
              // Fallback to default style if custom style not found
              layerConfigToAdd = createDefaultLayerConfig(layerId, {
                layerType: layerConfig.layerType,
                sourceLayer: layerConfig.sourceLayer
              })
              console.log(`Custom style not found, using default for layer: ${layerId}`)
            }
            
            map.current!.addLayer(layerConfigToAdd)
            
            // Add hover functionality for this layer
            addHoverHandlers(layerId, layerConfig.name, map.current!)
            
            // Set default opacity for the layer
            const defaultOpacity = 80
            setLayerOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
            updateLayerOpacity(layerId, defaultOpacity, map.current!)
            
            console.log(`Successfully added layer: ${layerId}`)
            
            // Set loaded state
            setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'loaded' }))
            
            // Note: Error handling can be enhanced with proper event listeners when needed
            
          } catch (error) {
            console.error(`Error adding layer ${layerId}:`, error)
            setLayerLoadingStates(prev => ({ ...prev, [layerId]: 'error' }))
          }
        }
      }
    })
    
    setSelectedLayers(layers)
  }

  return (
    <div className="relative w-full h-screen min-h-lvh">
      {isComparisonMode ? (
        <div 
          ref={comparisonContainer} 
          className="w-full h-full"
          style={{ position: 'relative' }}
        >
          <div 
            ref={beforeMapContainer} 
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          />
          <div 
            ref={afterMapContainer} 
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
          />
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}

      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4 z-20 md:hidden bg-white shadow-lg h-12 w-12 mr-2"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={`absolute bg-white top-6 left-6 z-20 overflow-y-auto! w-80 rounded-lg lg:min-h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] shadow-lg transition-transform duration-300 ease-in-out
          max-md:top-20 max-md:left-4 max-md:right-4 max-md:w-auto max-md:max-h-[calc(100vh-100px)]
          ${isMenuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full max-md:opacity-0"}
          md:translate-x-0 md:opacity-100
        `}
      >
        <div className="p-4 border-b md:hidden">
          <button className="z-20 pb-4 flex pt-2 hover:cursor-pointer text-sm mr-2 bg-transparent p-0 flex-row items-center gap-2" onClick={() => router.back()}><ChevronLeftIcon className="w-5 h-5" /> Voltar</button>
          <h2 className="text-lg font-semibold">Selecione a cidade</h2>
        </div>

        <div className="flex flex-col h-full">
          <div className="md:px-4 md:pt-4">
          <button className="z-20 pb-4 hidden md:flex pt-2 hover:cursor-pointer text-sm mr-2 bg-transparent p-0 flex-row items-center gap-2" onClick={() => router.back()}><ChevronLeftIcon className="w-5 h-5" /> Voltar</button>
            <h2 className="text-xl font-bold text-gray-900 hidden md:block">Selecione a cidade</h2>
          </div>

          <div className="flex-1 overflow-y-auto!">
            <div className="mb-4">
              <CityAccordion selectedCity={selectedCity} onCityChange={handleCityChange} />
            </div>
            {isComparisonMode ? (
              <CityLayersComparison
                selectedCity={selectedCity || "Brasil"}
                selectedLayer1={selectedLayer1}
                selectedLayer2={selectedLayer2}
                onLayer1Change={handleLayer1Change}
                onLayer2Change={handleLayer2Change}
                layerLoadingStates={layerLoadingStates}
                layerOpacities={layerOpacities}
                onOpacityChange={handleOpacityChange}
              />
            ) : (
              <CityLayers
                selectedCity={selectedCity || "Brasil"}
                selectedLayers={selectedLayers}
                onLayersChange={handleLayersChange}
                layerLoadingStates={layerLoadingStates}
                layerOpacities={layerOpacities}
                onOpacityChange={handleOpacityChange}
              />
            )}
          </div>
        </div>
      </div>

       {/* legends */}
       <CollapsibleLegend
         selectedLayers={isComparisonMode ? [selectedLayer1, selectedLayer2].filter(Boolean) as string[] : selectedLayers}
         selectedCity={selectedCity || "Brasil"}
         cityLayersConfig={cityLayersConfig}
         mapTheme={mapTheme}
         onThemeToggle={handleThemeToggle}
       />
       <div className="absolute top-4 right-4 z-9">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleComparisonMode}
              className={`p-3 rounded-md outline-none transition-colors ${
                isComparisonMode 
                  ? 'bg-primary  hover:bg-primary/90 border-primary text-white' 
                  : 'bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <Layers className="w-5 h-5"/>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isComparisonMode ? 'Sair do Modo de Comparação' : 'Comparar Camadas'}</p>
          </TooltipContent>
        </Tooltip>
        </div>

        {/* Custom zoom and recenter buttons */}
        <div className="fixed bottom-4 right-4 z-5 flex flex-col gap-2">
          {/* Zoom In Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleZoomIn}
                className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>

          {/* Zoom Out Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleZoomOut}
                className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <Minus className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>

          {/* Recenter Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleRecenter}
                className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <Compass className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Reset Map View</p>
            </TooltipContent>
          </Tooltip>
        </div>



      {isMenuOpen && <div className="fixed inset-0 bg-opacity-50 z-5 md:hidden" onClick={toggleMenu} />}
    </div>
  )
}
