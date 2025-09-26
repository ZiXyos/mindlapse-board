import {DataTableProps} from "@/lib/data.table.props";
import {useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@shared/ui/components/ui/table";
import { TablePagination } from "./table-pagination";

interface PaginationProps {
  pageIndex: number
  pageSize: number
  totalPages: number
  totalRows: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageIndexChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
  onFirstPage: () => void
  onLastPage: () => void
  onNextPage: () => void
  onPreviousPage: () => void
}

interface EnhancedDataTableProps<TData, TValue> extends DataTableProps<TData, TValue> {
  isLoading?: boolean
  pagination?: PaginationProps
}

export const DataTable = <TData, TValue>({
  columns, 
  data, 
  isLoading = false,
  pagination
}: EnhancedDataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages ?? -1,
  })

  return (
    <div className="flex flex-col gap-4">
      <div className={"overflow-hidden rounded-md border"}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-4 px-6">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getCoreRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {pagination && (
        <TablePagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalPages={pagination.totalPages}
          totalRows={pagination.totalRows}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          onPageIndexChange={pagination.onPageIndexChange}
          onPageSizeChange={pagination.onPageSizeChange}
          onFirstPage={pagination.onFirstPage}
          onLastPage={pagination.onLastPage}
          onNextPage={pagination.onNextPage}
          onPreviousPage={pagination.onPreviousPage}
        />
      )}
    </div>
  )
}
