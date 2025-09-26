import {
  ColumnDef
} from '@tanstack/react-table'
import {ProductWithVariantsAndCategories} from "@mindboard/shared";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const productColumns: Array<ColumnDef<ProductWithVariantsAndCategories>> = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: 'totalStock',
    header: "Total Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
]
