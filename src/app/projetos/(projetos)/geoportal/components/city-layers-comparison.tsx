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
import { getAvailableLayers } from "../lib/city-layers"
import regionManifest from "../lib/region-manifest.json"
import { RecorteSelect } from "./recorte-select"

interface CityLayersComparisonProps {
  selectedCity: string
  selectedMunicipality?: string
  selectedLayer1: string | null
  selectedLayer2: string | null
  onLayer1Change: (layerId: string | null) => void
  onLayer2Change: (layerId: string | null) => void
  layerLoadingStates?: Record<string, 'loading' | 'loaded' | 'error'>
  layerOpacities?: Record<string, number>
  onOpacityChange?: (layerId: string, opacity: number, isLayer1: boolean) => void
  recorte1: string
  recorte2: string
  onRecorte1Change: (value: string) => void
  onRecorte2Change: (value: string) => void
}

export function CityLayersComparison({ 
  selectedCity, 
  selectedMunicipality,
  selectedLayer1, 
  selectedLayer2, 
  onLayer1Change, 
  onLayer2Change, 
  layerLoadingStates = {}, 
  layerOpacities = {}, 
  onOpacityChange,
  recorte1,
  recorte2,
  onRecorte1Change,
  onRecorte2Change,
}: CityLayersComparisonProps) {
  const cityLayers = getAvailableLayers(selectedCity, selectedMunicipality)
  const region = regionManifest.regions.find((item) => item.id === selectedCity)
  const [localOpacities, setLocalOpacities] = useState<Record<string, number>>({})
  const [attentionState, setAttentionState] = useState<{target: 'layer1' | 'layer2' | null, show: boolean}>({
    target: null,
    show: false
  })
  const [accordionValue, setAccordionValue] = useState<string[]>(["layer1", "layer2"])

  const handleLayerToggle = (layerId: string, checked: boolean, isLayer1: boolean) => {
    if (checked) {
      if (isLayer1) {
        // Se já havia uma camada 1 selecionada, remove ela primeiro
        if (selectedLayer1 && selectedLayer1 !== layerId) {
          onLayer1Change(null)
          // Clean up local opacity when layer is disabled
          setLocalOpacities(prev => {
            const newState = { ...prev }
            delete newState[`left:${selectedLayer1}`]
            return newState
          })
        }
        onLayer1Change(layerId)
        // Set default opacity when layer is enabled
        const defaultOpacity = 80
        if (!(`left:${layerId}` in layerOpacities) && !(`left:${layerId}` in localOpacities)) {
          setLocalOpacities(prev => ({ ...prev, [`left:${layerId}`]: defaultOpacity }))
          onOpacityChange?.(layerId, defaultOpacity, true)
        }
        // Trigger attention to layer2 if it's not selected
        if (!selectedLayer2) {
          triggerAttention('layer2')
        }
      } else {
        // Se já havia uma camada 2 selecionada, remove ela primeiro
        if (selectedLayer2 && selectedLayer2 !== layerId) {
          onLayer2Change(null)
          // Clean up local opacity when layer is disabled
          setLocalOpacities(prev => {
            const newState = { ...prev }
            delete newState[`right:${selectedLayer2}`]
            return newState
          })
        }
        onLayer2Change(layerId)
        // Set default opacity when layer is enabled
        const defaultOpacity = 80
        if (!(`right:${layerId}` in layerOpacities) && !(`right:${layerId}` in localOpacities)) {
          setLocalOpacities(prev => ({ ...prev, [`right:${layerId}`]: defaultOpacity }))
          onOpacityChange?.(layerId, defaultOpacity, false)
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
          delete newState[`left:${layerId}`]
          return newState
        })
      } else {
        onLayer2Change(null)
        // Clean up local opacity when layer is disabled
        setLocalOpacities(prev => {
          const newState = { ...prev }
          delete newState[`right:${layerId}`]
          return newState
        })
      }
    }
  }

  const handleOpacityChange = (layerId: string, value: number[], isLayer1: boolean) => {
    const opacity = value[0]
    setLocalOpacities(prev => ({ ...prev, [`${isLayer1 ? 'left' : 'right'}:${layerId}`]: opacity }))
    onOpacityChange?.(layerId, opacity, isLayer1)
  }

  // Get current opacity value (prioritize prop over local state)
  const getCurrentOpacity = (layerId: string, isLayer1: boolean) => {
    const key = `${isLayer1 ? 'left' : 'right'}:${layerId}`
    return layerOpacities[key] ?? localOpacities[key] ?? 80
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

  if (cityLayers.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 text-md">Nenhuma camada disponível para esta região</p>
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
                const category = layer.category ?? 'context'
                const previousCategory = cityLayers[index - 1]?.category ?? 'context'
                const municipality = region?.municipalities.find((item) => item.id === layer.municipalityId)
                
                return (
                  <div key={`layer1-${layer.id}`}>
                    {(index === 0 || category !== previousCategory) && <h3 className="px-4 py-2 text-sm font-semibold text-gray-600">{{ modal: 'Divisão modal', commute: 'Tempo de deslocamento', context: 'Contexto' }[category]}</h3>}
                    <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${
                      isSelected 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : attentionState.show && attentionState.target === 'layer1'
                            ? 'bg-flicker hover:bg-blue-50'
                            : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label
                          htmlFor={`layer-1-${layer.id}`}
                          className="text-sm flex flex-row items-center gap-2 text-black leading-relaxed cursor-pointer"
                          style={{ color: '#000000' }}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span className={`block ${isSelected ? 'font-semibold' : 'font-medium'}`} style={{ color: '#000000' }}>{municipality && !selectedMunicipality ? `${municipality.name} · ` : ''}{layer.name}</span>
                          </div>
                          {layer.description && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 shrink-0" />
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
                            {layer.metric && <RecorteSelect id={`recorte-left-${layer.id}`} value={recorte1} onChange={onRecorte1Change} />}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600 font-medium">Opacidade</span>
                              </div>
                              <span className="text-xs text-gray-500 font-mono">
                                {getCurrentOpacity(layer.id, true)}%
                              </span>
                            </div>
                            <Slider
                              className="w-full"
                              value={[getCurrentOpacity(layer.id, true)]}
                              onValueChange={(value) => handleOpacityChange(layer.id, value, true)}
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
                        disabled={layerLoadingStates[`left:${layer.id}`] === 'loading'}
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
                const category = layer.category ?? 'context'
                const previousCategory = cityLayers[index - 1]?.category ?? 'context'
                const municipality = region?.municipalities.find((item) => item.id === layer.municipalityId)
                
                return (
                  <div key={`layer2-${layer.id}`}>
                    {(index === 0 || category !== previousCategory) && <h3 className="px-4 py-2 text-sm font-semibold text-gray-600">{{ modal: 'Divisão modal', commute: 'Tempo de deslocamento', context: 'Contexto' }[category]}</h3>}
                    <div className={`px-4 gap-4 flex items-center justify-between py-3 transition-colors ${
                      isSelected 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : attentionState.show && attentionState.target === 'layer2'
                            ? 'bg-flicker hover:bg-blue-50'
                            : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label
                          htmlFor={`layer-2-${layer.id}`}
                          className="text-sm flex flex-row items-center gap-2 text-black leading-relaxed cursor-pointer"
                          style={{ color: '#000000' }}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span className={`block ${isSelected ? 'font-semibold' : 'font-medium'}`} style={{ color: '#000000' }}>{municipality && !selectedMunicipality ? `${municipality.name} · ` : ''}{layer.name}</span>
                          </div>
                          {layer.description && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 shrink-0" />
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
                            {layer.metric && <RecorteSelect id={`recorte-right-${layer.id}`} value={recorte2} onChange={onRecorte2Change} />}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600 font-medium">Opacidade</span>
                              </div>
                              <span className="text-xs text-gray-500 font-mono">
                                {getCurrentOpacity(layer.id, false)}%
                              </span>
                            </div>
                            <Slider
                              className="w-full"
                              value={[getCurrentOpacity(layer.id, false)]}
                              onValueChange={(value) => handleOpacityChange(layer.id, value, false)}
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
                        disabled={layerLoadingStates[`right:${layer.id}`] === 'loading'}
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
