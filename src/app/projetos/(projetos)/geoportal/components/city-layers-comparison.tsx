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

interface CityLayersComparisonProps {
  selectedCity: string
  selectedLayer1: string | null
  selectedLayer2: string | null
  onLayer1Change: (layerId: string | null) => void
  onLayer2Change: (layerId: string | null) => void
  layerLoadingStates?: Record<string, 'loading' | 'loaded' | 'error'>
  layerOpacities?: Record<string, number>
  onOpacityChange?: (layerId: string, opacity: number) => void
}

export function CityLayersComparison({ 
  selectedCity, 
  selectedLayer1, 
  selectedLayer2, 
  onLayer1Change, 
  onLayer2Change, 
  layerLoadingStates = {}, 
  layerOpacities = {}, 
  onOpacityChange 
}: CityLayersComparisonProps) {
  const cityLayers = cityLayersConfig[selectedCity] || []
  const [localOpacities, setLocalOpacities] = useState<Record<string, number>>({})
  const [attentionState, setAttentionState] = useState<{target: 'layer1' | 'layer2' | null, show: boolean}>({
    target: null,
    show: false
  })
  const [accordionValue, setAccordionValue] = useState<string[]>(["layer1", "layer2"])

  const handleLayerToggle = (layerId: string, checked: boolean, isLayer1: boolean) => {
    // Prevent selection if layer is already selected in the other section
    if (checked && isLayerDisabled(layerId, isLayer1)) {
      return
    }

    if (checked) {
      if (isLayer1) {
        // Se está selecionando na camada 1, remove da camada 2 se estiver lá
        if (selectedLayer2 === layerId) {
          onLayer2Change(null)
        }
        // Se já havia uma camada 1 selecionada, remove ela primeiro
        if (selectedLayer1 && selectedLayer1 !== layerId) {
          onLayer1Change(null)
          // Clean up local opacity when layer is disabled
          setLocalOpacities(prev => {
            const newState = { ...prev }
            delete newState[selectedLayer1]
            return newState
          })
        }
        onLayer1Change(layerId)
        // Set default opacity when layer is enabled
        const defaultOpacity = 80
        if (!(layerId in layerOpacities) && !(layerId in localOpacities)) {
          setLocalOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
          onOpacityChange?.(layerId, defaultOpacity)
        }
        // Trigger attention to layer2 if it's not selected
        if (!selectedLayer2) {
          triggerAttention('layer2')
        }
      } else {
        // Se está selecionando na camada 2, remove da camada 1 se estiver lá
        if (selectedLayer1 === layerId) {
          onLayer1Change(null)
        }
        // Se já havia uma camada 2 selecionada, remove ela primeiro
        if (selectedLayer2 && selectedLayer2 !== layerId) {
          onLayer2Change(null)
          // Clean up local opacity when layer is disabled
          setLocalOpacities(prev => {
            const newState = { ...prev }
            delete newState[selectedLayer2]
            return newState
          })
        }
        onLayer2Change(layerId)
        // Set default opacity when layer is enabled
        const defaultOpacity = 80
        if (!(layerId in layerOpacities) && !(layerId in localOpacities)) {
          setLocalOpacities(prev => ({ ...prev, [layerId]: defaultOpacity }))
          onOpacityChange?.(layerId, defaultOpacity)
        }
        // Trigger attention to layer1 if it's not selected
        if (!selectedLayer1) {
          triggerAttention('layer1')
        }
      }
    } else {
      if (isLayer1) {
        onLayer1Change(null)
        // Clean up local opacity when layer is disabled
        setLocalOpacities(prev => {
          const newState = { ...prev }
          delete newState[layerId]
          return newState
        })
      } else {
        onLayer2Change(null)
        // Clean up local opacity when layer is disabled
        setLocalOpacities(prev => {
          const newState = { ...prev }
          delete newState[layerId]
          return newState
        })
      }
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

  // Check if a layer is disabled (already selected in the other section)
  const isLayerDisabled = (layerId: string, isLayer1: boolean) => {
    if (isLayer1) {
      return selectedLayer2 === layerId
    } else {
      return selectedLayer1 === layerId
    }
  }

  const triggerAttention = (targetLayer: 'layer1' | 'layer2') => {
    setAttentionState({ target: targetLayer, show: true })
    
    // Close the selected layer accordion and open the target layer accordion
    if (targetLayer === 'layer1') {
      setAccordionValue(['layer1']) // Only layer1 open
    } else {
      setAccordionValue(['layer2']) // Only layer2 open
    }
    
    // Clear attention after 3 seconds
    setTimeout(() => {
      setAttentionState(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  // Clear attention when both layers are selected
  useEffect(() => {
    if (selectedLayer1 && selectedLayer2) {
      setAttentionState({ target: null, show: false })
    }
  }, [selectedLayer1, selectedLayer2])

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
    <>
      <style jsx>{`
        .bg-flicker {
          animation: bgFlicker 1.5s ease-in-out infinite;
        }
        
        @keyframes bgFlicker {
          0%, 100% { background-color: rgb(219 234 254); } /* bg-blue-100 */
          50% { background-color: rgb(239 246 255); } /* bg-blue-50 */
        }
      `}</style>
      <div className="space-y-0">
      <Accordion
        type="multiple"
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="w-full pb-10"
      >
                          <h2 className="px-4 text-xl font-bold text-gray-900 block md:block">Selecione as camadas</h2>

        <AccordionItem value="layer1" className="border-b">
          <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-3 hover:no-underline text-base">
            <span className="truncate">
              {selectedLayer1 ? cityLayers.find(l => l.id === selectedLayer1)?.name || 'Camada da esquerda' : 'Camada da esquerda'}
            </span>
          </AccordionTrigger>
          <div className="h-[0.5px] w-full bg-gray-300"/>
          <AccordionContent className="pb-0">
            <div className="space-y-0">
              {cityLayers.map((layer, index) => {
                const isSelected = selectedLayer1 === layer.id
                const isDisabled = isLayerDisabled(layer.id, true)
                
                return (
                  <div key={`layer1-${layer.id}`}>
                    <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${
                      isSelected 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : isDisabled
                          ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                          : attentionState.show && attentionState.target === 'layer1'
                            ? 'bg-flicker hover:bg-blue-50'
                            : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label
                          htmlFor={`layer-1-${layer.id}`}
                          className={`text-sm flex flex-row items-center gap-2 text-black leading-relaxed ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          style={{ color: '#000000' }}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium'}`} style={{ color: '#000000' }}>{layer.name}</span>
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
                        id={`layer-1-${layer.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => handleLayerToggle(layer.id, checked, true)}
                        disabled={layerLoadingStates[layer.id] === 'loading' || isDisabled}
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

        <AccordionItem value="layer2" className="border-b">
          <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-3 hover:no-underline text-base">
            <span className="truncate">
              {selectedLayer2 ? cityLayers.find(l => l.id === selectedLayer2)?.name || 'Camada da direita' : 'Camada da direita'}
            </span>
          </AccordionTrigger>
          <div className="h-[0.5px] w-full bg-gray-300"/>
          <AccordionContent className="pb-0">
            <div className="space-y-0">
              {cityLayers.map((layer, index) => {
                const isSelected = selectedLayer2 === layer.id
                const isDisabled = isLayerDisabled(layer.id, false)
                
                return (
                  <div key={`layer2-${layer.id}`}>
                    <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${
                      isSelected 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : isDisabled
                          ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                          : attentionState.show && attentionState.target === 'layer2'
                            ? 'bg-flicker hover:bg-blue-50'
                            : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label
                          htmlFor={`layer-2-${layer.id}`}
                          className={`text-sm flex flex-row items-center gap-2 text-black leading-relaxed ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          style={{ color: '#000000' }}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium'}`} style={{ color: '#000000' }}>{layer.name}</span>
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
                        id={`layer-2-${layer.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => handleLayerToggle(layer.id, checked, false)}
                        disabled={layerLoadingStates[layer.id] === 'loading' || isDisabled}
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
    </>
  )
}
