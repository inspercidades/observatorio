import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { TransportData } from "./types"

/**
 * Formata números no padrão brasileiro:
 * - Vírgula para decimal
 * - Ponto para separador de milhar
 * - Números normais com até 2 casas decimais
 * - Percentuais com uma casa decimal e símbolo %
 */
function formatNumber(value: number | string | null, isPercentage: boolean): string {
  if (value === null || value === undefined) {
    return "-"
  }

  const numValue = typeof value === "string" ? parseFloat(value) : value

  if (isNaN(numValue)) {
    return String(value)
  }

  if (isPercentage) {
    // Percentual: uma casa decimal no formato brasileiro
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(numValue) + "%"
  }

  // Número normal: vírgula para decimal, ponto para milhar, até 2 casas decimais
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numValue)

  // Remove zeros desnecessários após a vírgula
  if (formatted.includes(",")) {
    const [integerPart, decimalPart] = formatted.split(",")
    const trimmedDecimal = decimalPart.replace(/0+$/, "")
    return trimmedDecimal ? `${integerPart},${trimmedDecimal}` : integerPart
  }

  return formatted
}

export function createColumns(selectedFilter: string, question?: string): ColumnDef<TransportData>[] {
  // Detecta se é um valor percentual baseado no nome do filtro
  const isPercentage = selectedFilter.toLowerCase().includes("percentual")
  return [
    {
      accessorKey: "municipio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3 h-8 pl-0"
          >
            Município
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("municipio")}</div>,
    },
    {
      accessorKey: "unidadeFederativa",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-3 h-8 pl-0"
          >
            Unidade Federativa
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("unidadeFederativa")}</div>,
    },
    {
      accessorKey: "value",
      header: () => {
        return (
          <div className="flex items-center gap-2">
            <span>{selectedFilter}</span>
          </div>
        )
      },
      cell: ({ row }) => {
        const value = row.getValue("value") as number | string | null
        return (
          <div className="font-medium">{formatNumber(value, isPercentage)}</div>
        )
      },
    },
  ]
} 