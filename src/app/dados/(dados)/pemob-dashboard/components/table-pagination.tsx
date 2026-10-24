import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TransportData } from "../lib/types"

interface TablePaginationProps {
  table: Table<TransportData>
}

export function TablePagination({ table }: TablePaginationProps) {
  // Calculate the range of items being displayed
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const startRange = pageIndex * pageSize + 1
  const endRange = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-9">
      <div className="text-sm text-muted-foreground text-center sm:text-left">
        {totalRows > 0 
          ? (
            <>
              {/* Mobile: Shorter version */}
              <span className="sm:hidden">
                {startRange}-{endRange} de {totalRows}
              </span>
              {/* Desktop: Full version */}
              <span className="hidden sm:inline">
                Mostrando {startRange} até {endRange} de {totalRows} resultados
              </span>
            </>
          )
          : "Nenhum resultado encontrado"
        }
      </div>
      <div className="flex items-center justify-center space-x-2 sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 sm:px-4 h-9"
        >
          <div className="flex items-center gap-1.5">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </div>
        </Button>
        <div className="text-sm whitespace-nowrap font-medium">
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 sm:px-4 h-9"
        >
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </Button>
      </div>
    </div>
  )
} 