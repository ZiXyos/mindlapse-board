import {
  ColumnDef
} from '@tanstack/react-table'
import {ProductWithVariantsAndCategories} from "@mindboard/shared";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
