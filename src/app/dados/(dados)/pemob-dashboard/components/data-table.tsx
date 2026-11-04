import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TooltipProvider } from "@/components/ui/tooltip"
import { flexRender } from "@tanstack/react-table"
import React from "react"
import { useTableState } from "../hooks/use-table-state"
import { createColumns } from "../lib/table-columns"
import { TransportData } from "../lib/types"

interface DataTableProps {
  data: TransportData[]
  selectedFilter: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

export function DataTable({ data, selectedFilter, globalFilter, setGlobalFilter }: DataTableProps) {
  // Get the question from the first data item (all items should have the same question for the same filter)
  const question = data.length > 0 ? data[0].label_pergunta : undefined
  
  const columns = React.useMemo(
    () => createColumns(selectedFilter, question),
    [selectedFilter, question]
  )

  const { table } = useTableState({
    data,
    columns,
    globalFilter,
    setGlobalFilter,
  })

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Data Table */}
        <div className="rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="py-4 px-4 lg:px-9">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 px-4 lg:px-9">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center py-6 px-9"
                  >
                    Nenhum dado encontrado para os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
} 