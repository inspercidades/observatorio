import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useFilterCategories } from "../hooks/use-filter-categories"
import { FilterSearch } from "./filter-search"

interface FiltersSidebarProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export function FiltersSidebar({ selectedFilter, onFilterChange }: FiltersSidebarProps) {
  const [searchFilter, setSearchFilter] = React.useState("")
  const { filteredCategories, hasResults } = useFilterCategories(searchFilter)

  return (
    <aside className="w-full">
      <div className="space-y-3">
        {/* Header */}
        <div className="space-y-0 pb-3 p-4">
          <h2 className="text-xl font-bold text-gray-900">Explore dados da Pesquisa Nacional de Mobilidade Urbana</h2>
          <div className="pb-2 text-sm text-gray-600">Pesquisa realizada pelo Mininstério das Cidades - {" "}
            <Link href="/dados/pemob-dashboard/saiba-mais" className="hover:text-primary hover:underline font-semibold">
              saiba mais 
             </Link>
          </div>
          <p className="text-md text-gray-600">Selecione uma das variáveis</p>
        </div>

        {/* Search */}
        <FilterSearch 
          placeholder="Buscar por variável..."
          searchFilter={searchFilter}
          onSearchChange={setSearchFilter}
        />
         <div className="h-[0.5px] w-full bg-gray-300"/>

        {/* Filters */}
        {!hasResults && searchFilter && (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-500 text-md">Nenhum resultado encontrado</p>
          </div>
        )}
        <Accordion type="multiple" defaultValue={[Object.keys(filteredCategories)[0]]} className="w-full -mt-3">
          {Object.entries(filteredCategories).map(([categoria, subcategorias], categoryIndex) => (
            <AccordionItem key={categoria} value={categoria} className="border-b">
              <AccordionTrigger className="text-left cursor-pointer px-4 font-semibold py-5 hover:no-underline text-md">
                {categoria}
              </AccordionTrigger>
              <div className="h-[0.5px] w-full bg-gray-300"/>
              <AccordionContent className="pb-0">
                <div className="space-y-0">
                  <Accordion 
                    type="multiple" 
                    defaultValue={categoryIndex === 0 ? [Object.keys(subcategorias)[0]] : []} 
                    className="w-full"
                  >
                    {Object.entries(subcategorias).map(([subcategoria, data], index) => {
                      return (
                        <AccordionItem key={subcategoria} value={subcategoria} className="border-none">
                          <AccordionTrigger className="text-left cursor-pointer flex items-center font-normal px-4 py-2 hover:no-underline">
                            <div className="flex py-2 pl-4 items-center space-x-2">
                              <Image 
                                src={data.icon} 
                                alt={subcategoria} 
                                width={20}
                                height={20}
                                className="h-5 w-5" 
                              />
                              <span className="text-sm text-gray-800 cursor-pointer">{subcategoria}</span>
                            </div>
                          </AccordionTrigger>
                          <div className="h-[0.5px] w-full bg-gray-300"/>
                          <AccordionContent className="pb-0">
                            <div className="space-y-0">
                              {data.options.map((opcao, optionIndex) => (
                                <React.Fragment key={opcao}>
                                  <div className="px-8 pr-4 gap-4 flex items-center justify-between py-3 ">
                                    <label
                                      htmlFor={opcao}
                                      className="text-sm cursor-pointer text-black flex-1 leading-relaxed"
                                    >
                                      {opcao}
                                    </label>
                                    <Switch
                                      className="cursor-pointer"
                                      id={opcao}
                                      checked={selectedFilter === opcao}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          onFilterChange(opcao)
                                        }
                                      }}
                                    />
                                  </div>
                                  {optionIndex !== data.options.length - 1 && <div className="h-[0.5px] w-full bg-gray-300"/>}
                                </React.Fragment>
                              ))}
                            </div>
                          </AccordionContent>
                          <div className="h-[0.5px] w-full bg-gray-300"/>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  )
} 