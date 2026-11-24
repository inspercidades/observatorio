"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getCitiesByGroup, getModalData, type CityData, type ModalData } from "@/lib/data/catalogo-utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

// Get real data from JSON
const citiesData: CityData[] = getCitiesByGroup('Cidade Parceira')

type SortOrder = "asc" | "desc" | null
type SortField = "cidade" | "gtfs" | "gpsEmbarcados" | "bilhetagem" | "arquivosVetoriais"

interface ModalState {
  isOpen: boolean
  cidade: string
  dataType: string
  modalData: ModalData | null
}

export default function CatalogoDeDadosCidadesParceiras() {
  const [sortField, setSortField] = useState<SortField>("cidade")
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [sortedData, setSortedData] = useState(citiesData)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    cidade: "",
    dataType: "",
    modalData: null,
  })

  const handleDownload = (cidade: string, dataType: string) => {
    // Map display names to data types
    const dataTypeMap: Record<string, string> = {
      'GTFS': 'GTFS',
      'GPS embarcados': 'GPS Embarcados', 
      'Bilhetagem': 'Bilhetagem',
      'Arquivos vetoriais': 'Outros Arquivos Vetoriais'
    }
    
    const mappedDataType = dataTypeMap[dataType] || dataType
    const modalData = getModalData(cidade, mappedDataType, 'Cidade Parceira')
    
    setModalState({
      isOpen: true,
      cidade,
      dataType,
      modalData,
    })
  }

  const handleSort = (field: SortField) => {
    let newSortOrder: SortOrder
    const newSortedData = [...citiesData]

    if (sortField === field) {
      // Same field, toggle order
      if (sortOrder === null || sortOrder === "desc") {
        newSortOrder = "asc"
      } else {
        newSortOrder = "desc"
      }
    } else {
      // New field, start with ascending
      newSortOrder = "asc"
    }

    // Sort the data
    newSortedData.sort((a, b) => {
      if (field === "cidade") {
        const aValue = a[field] as string
        const bValue = b[field] as string
        return newSortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else {
        // For boolean fields, true values come first in ascending order
        const aValue = (a[field] as boolean) ? 1 : 0
        const bValue = (b[field] as boolean) ? 1 : 0
        return newSortOrder === "asc" ? bValue - aValue : aValue - bValue
      }
    })

    setSortField(field)
    setSortOrder(newSortOrder)
    setSortedData(newSortedData)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronDown className="w-4 h-4 opacity-50" />
    }
    
    if (sortOrder === "asc") {
      return <ChevronUp className="w-4 h-4" />
    } else if (sortOrder === "desc") {
      return <ChevronDown className="w-4 h-4" />
    } else {
      return <ChevronDown className="w-4 h-4 opacity-50" />
    }
  }

  const currentModalData = modalState.modalData

  return (
    <div className="w-full mx-auto px-4 2xl:px-16">
      <div className="bg-white rounded-lg border">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="p-4">
            <div className="font-semibold text-xl text-gray-900">Cidades parceiras</div>
          </div>
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b">
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("cidade")}
            >
              Cidades
              {getSortIcon("cidade")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("gtfs")}
            >
              GTFS
              {getSortIcon("gtfs")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("gpsEmbarcados")}
            >
              GPS embarcados
              {getSortIcon("gpsEmbarcados")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("bilhetagem")}
            >
              Bilhetagem
              {getSortIcon("bilhetagem")}
            </div>
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("arquivosVetoriais")}
            >
              Arquivos vetoriais
              {getSortIcon("arquivosVetoriais")}
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y">
            {sortedData.map((city, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 p-4 items-center">
                <div className="font-medium text-gray-900">{city.cidade}</div>
                <div>
                  <Button
                    size="lg"
                    variant={city.gtfs ? "default" : "secondary"}
                    disabled={!city.gtfs}
                    onClick={() => handleDownload(city.cidade, "GTFS")}
                    className={` ${
                      city.gtfs
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
                <div>
                  <Button
                    size="lg"
                    variant={city.gpsEmbarcados ? "default" : "secondary"}
                    disabled={!city.gpsEmbarcados}
                    onClick={() => handleDownload(city.cidade, "GPS embarcados")}
                    className={`${
                      city.gpsEmbarcados
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
                <div>
                  <Button
                    size="lg"
                    variant={city.bilhetagem ? "default" : "secondary"}
                    disabled={!city.bilhetagem}
                    onClick={() => handleDownload(city.cidade, "Bilhetagem")}
                    className={`${
                      city.bilhetagem
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
                <div>
                  <Button
                    size="lg"
                    variant={city.arquivosVetoriais ? "default" : "secondary"}
                    disabled={!city.arquivosVetoriais}
                    onClick={() => handleDownload(city.cidade, "Arquivos vetoriais")}
                    className={`${
                      city.arquivosVetoriais
                        ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Acesse
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden">
           <div className="p-4">
            <div className="font-semibold text-xl text-gray-900">Cidades parceiras</div>
          </div>
          {/* Mobile Header */}
          <div className="p-4 border-b">
            <div
              className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer hover:text-gray-700 select-none"
              onClick={() => handleSort("cidade")}
            >
              Cidades
              {getSortIcon("cidade")}
            </div>
          </div>
          {/* Mobile Cards */}
          <div className="divide-y">
            {sortedData.map((city, index) => (
              <div key={index} className="p-4 space-y-3">
                <div className="font-medium text-gray-900 text-lg">{city.cidade}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">GTFS</div>
                    <Button
                      size="lg"
                      variant={city.gtfs ? "default" : "secondary"}
                      disabled={!city.gtfs}
                      onClick={() => handleDownload(city.cidade, "GTFS")}
                      className={`w-full ${
                        city.gtfs
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">GPS embarcados</div>
                    <Button
                      size="lg"
                      variant={city.gpsEmbarcados ? "default" : "secondary"}
                      disabled={!city.gpsEmbarcados}
                      onClick={() => handleDownload(city.cidade, "GPS embarcados")}
                      className={`w-full ${
                        city.gpsEmbarcados
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Bilhetagem</div>
                    <Button
                      size="lg"
                      variant={city.bilhetagem ? "default" : "secondary"}
                      disabled={!city.bilhetagem}
                      onClick={() => handleDownload(city.cidade, "Bilhetagem")}
                      className={`w-full ${
                        city.bilhetagem
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Arquivos vetoriais</div>
                    <Button
                      size="lg"
                      variant={city.arquivosVetoriais ? "default" : "secondary"}
                      disabled={!city.arquivosVetoriais}
                      onClick={() => handleDownload(city.cidade, "Arquivos vetoriais")}
                      className={`w-full ${
                        city.arquivosVetoriais
                          ? "bg-primary hover:bg-primary/90 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Acesse
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalState.isOpen} onOpenChange={(open) => setModalState((prev) => ({ ...prev, isOpen: open }))}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-10">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900">{currentModalData?.title}</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm md:text-base leading-relaxed">
              {currentModalData?.subtitle}
            </DialogDescription>
            <div className="my-3 h-[1px] flex-grow bg-gray-100" />
          </DialogHeader>

          <div className="space-y-0 -mt-6">
            {currentModalData?.sources.map((source, index) => (
              <div key={index}>
                <div className="py-4">
                  {/* Check if we have multiple datasets for accordion */}
                  {source.datasets && source.datasets.length > 1 ? (
                    /* Use Accordion for multiple datasets */
                    <div className="w-full">
                      {/* Mobile Layout */}
                      <div className="block md:hidden">
                        <div className="mb-3">
                          <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">{source.description}</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="datasets" className="border-none">
                            <AccordionTrigger className="w-full px-4 py-3 bg-primary text-white hover:bg-primary/90 rounded-md flex items-center justify-center gap-2 hover:no-underline text-sm">
                              Ver datasets ({source.datasets.length})
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="mt-3 space-y-2">
                                {source.datasets.map((dataset, datasetIndex) => (
                                  <div key={datasetIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded">
                                    <span className={`text-sm flex-1 ${dataset.isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {dataset.titulo_dado || 'Dataset'}
                                    </span>
                                    <Button
                                      size="sm"
                                      disabled={dataset.isDisabled}
                                      onClick={() => {
                                        if (dataset.isDisabled) return
                                        window.open(dataset.link, "_blank")
                                      }}
                                      className={`w-full sm:w-auto ${dataset.isDisabled ? 'cursor-not-allowed opacity-50' : 'bg-primary hover:bg-primary/90 text-white'}`}
                                    >
                                      Acesse
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:block">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="datasets" className="border-none">
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{source.description}</p>
                              </div>
                              <AccordionTrigger className="px-6 py-2 min-w-[140px] bg-primary text-white hover:bg-primary/90 rounded-md flex items-center justify-center gap-2 hover:no-underline">
                                Ver datasets ({source.datasets.length})
                              </AccordionTrigger>
                            </div>
                            <AccordionContent>
                              <div className="mt-4 space-y-2">
                                {source.datasets.map((dataset, datasetIndex) => (
                                  <div key={datasetIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                    <span className={`text-sm ${dataset.isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {dataset.titulo_dado || 'Dataset'}
                                    </span>
                                    <Button
                                      size="sm"
                                      disabled={dataset.isDisabled}
                                      onClick={() => {
                                        if (dataset.isDisabled) return
                                        window.open(dataset.link, "_blank")
                                      }}
                                      className={dataset.isDisabled ? 'cursor-not-allowed opacity-50' : 'bg-primary hover:bg-primary/90 text-white'}
                                    >
                                      Acesse
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  ) : (
                    /* Regular layout for single dataset or no specific datasets */
                    <div>
                      {/* Mobile Layout */}
                      <div className="block md:hidden">
                        <div className="mb-3">
                          <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{source.description}</p>
                        </div>
                        <div className="space-y-2">
                          {/* Main action button */}
                          <Button
                            disabled={source.isDisabled}
                            onClick={() => {
                              if (source.isDisabled) return
                              window.open(source.actionUrl, "_blank")
                            }}
                            className={`w-full py-3 ${source.isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                          >
                            {source.actionText}
                          </Button>
                          
                          {/* Individual dataset buttons when there's only one and different from main button */}
                          {source.datasets && source.datasets.length === 1 && source.datasets[0].titulo_dado && source.datasets[0].link !== source.actionUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={source.datasets[0].isDisabled}
                              onClick={() => {
                                const dataset = source.datasets![0]
                                if (dataset.isDisabled) return
                                window.open(dataset.link, "_blank")
                              }}
                              className={`w-full py-2 text-sm ${source.datasets[0].isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                              {source.datasets[0].titulo_dado}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{source.description}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 shrink-0">
                          {/* Main action button */}
                          <Button
                            disabled={source.isDisabled}
                            onClick={() => {
                              if (source.isDisabled) return
                              window.open(source.actionUrl, "_blank")
                            }}
                            className={`px-6 py-2 min-w-[100px] ${source.isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                          >
                            {source.actionText}
                          </Button>
                          
                          {/* Individual dataset buttons when there's only one and different from main button */}
                          {source.datasets && source.datasets.length === 1 && source.datasets[0].titulo_dado && source.datasets[0].link !== source.actionUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={source.datasets[0].isDisabled}
                              onClick={() => {
                                const dataset = source.datasets![0]
                                if (dataset.isDisabled) return
                                window.open(dataset.link, "_blank")
                              }}
                              className={`text-xs ${source.datasets[0].isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                              {source.datasets[0].titulo_dado}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {index < currentModalData.sources.length - 1 && (
                  <div className="h-[1.2px] flex-grow bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
