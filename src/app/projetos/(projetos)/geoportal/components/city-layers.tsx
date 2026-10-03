"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, Info } from "lucide-react"
import { useEffect, useState } from "react"
import { cityLayersConfig } from "../lib/city-layers"

interface CityLayersProps {
  selectedCity: string
  selectedLayers: string[]
  onLayersChange: (layers: string[]) => void
  layerLoadingStates?: Record<string, 'loading' | 'loaded' | 'error'>
  layerOpacities?: Record<string, number>
  onOpacityChange?: (layerId: string, opacity: number) => void
}

export function CityLayers({ selectedCity, selectedLayers, onLayersChange, layerLoadingStates = {}, layerOpacities = {}, onOpacityChange }: CityLayersProps) {
  const cityLayers = cityLayersConfig[selectedCity] || []
  const [localOpacities, setLocalOpacities] = useState<Record<string, number>>({})
  const [accordionValue, setAccordionValue] = useState<string>("layers")

  // Keep accordion open when city changes
  useEffect(() => {
    if (selectedCity && selectedCity !== "Brasil" && cityLayers.length > 0) {
      setAccordionValue("layers")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity])

  const handleLayerToggle = (layerId: string, checked: boolean) => {
    if (checked) {
      onLayersChange([...selectedLayers, layerId])
      // Set default opacity when layer is enabled
      const defaultOpacity = 80
      if (!(layerId in layerOpacities) && !(layerId in localOpacities)) {
        setLocalOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
        onOpacityChange?.(layerId, defaultOpacity)
      }
    } else {
      onLayersChange(selectedLayers.filter(id => id !== layerId))
      // Clean up local opacity when layer is disabled
      setLocalOpacities(prev => {
        const newState = { ...prev }
        delete newState[layerId]
        return newState
      })
    }
  }

  const handleOpacityChange = (layerId: string, value: number[]) => {
    const opacity = value[0]
    setLocalOpacities(prev => ({ ...prev, [layerId]: opacity }))
    onOpacityChange?.(layerId, opacity)
  }

  // Get current opacity value (prioritize prop over local state)
  const getCurrentOpacity = (layerId: string) => {
    return layerOpacities[layerId] ?? localOpacities[layerId] ?? 80
  }

  if (!selectedCity || selectedCity === "Brasil") {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 text-md">Selecione uma cidade para exibir as camadas</p>
      </div>
    )
  }

  if (cityLayers.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 text-md">Nenhuma camada disponível para esta cidade</p>
      </div>
    )
  }

  return (
    <div className="space-y-0 pb-10">
                  <h2 className="px-4 text-xl font-bold text-gray-900 ">Selecione as camadas</h2>

      <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={setAccordionValue}>
        <AccordionItem value="layers" className="border-b">
          <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-3 hover:no-underline text-base">
            Camadas
          </AccordionTrigger>
          {/* <div className="h-[0.5px] w-full bg-gray-300"/> */}
          <AccordionContent className="pb-0">
            <div className="space-y-0">
              {cityLayers.map((layer, index) => {
                const isSelected = selectedLayers.includes(layer.id)
                
                return (
                  <div key={layer.id}>
                    <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${isSelected ? 'bg-gray-50 border-l-4 border-l-gray-500' : 'hover:bg-gray-50'}`}>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label
                          htmlFor={`layer-${layer.id}`}
                          className="text-sm flex flex-row items-center gap-2 cursor-pointer text-black leading-relaxed"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium'}`}>{layer.name}</span>
                          </div>
                          {layer.description && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                  <Info className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-xs">
                                <p>{layer.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </label>
                        {/* Opacity slider */}
                        {isSelected && (
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600 font-medium">Opacidade</span>
                              </div>
                              <span className="text-xs text-gray-500 font-mono">
                                {getCurrentOpacity(layer.id)}%
                              </span>
                            </div>
                            <Slider
                              className="w-full"
                              value={[getCurrentOpacity(layer.id)]}
                              onValueChange={(value) => handleOpacityChange(layer.id, value)}
                              max={100}
                              step={1}
                              aria-label={`Ajustar opacidade da camada ${layer.name}`}
                            />
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Transparente</span>
                              <span>Opaco</span>
                            </div>
                          </div>
                        )}
                        
                      </div>
                      <Switch
                        className="cursor-pointer flex-shrink-0 ml-2"
                        id={`layer-${layer.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => handleLayerToggle(layer.id, checked)}
                        disabled={layerLoadingStates[layer.id] === 'loading'}
                      />
                    </div>
                    {index !== cityLayers.length - 1 && (
                      <div className="h-[0.5px] w-full bg-gray-300"/>
                    )}
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
