import type {ColumnDef} from "@tanstack/react-table";
import type {ProductWithVariantsAndCategories} from "@mindboard/shared";
import {DataTable} from "@shared/ui/components/data.table";
import {useEffect, useState} from "react";
import {productsPlaceholder} from "./dummy";
import { toast } from 'sonner'
import {Label} from "@shared/ui/components/ui/label";
import { Input} from "@shared/ui/components/ui/input";

const productColumns: Array<ColumnDef<ProductWithVariantsAndCategories>> = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories = row.getValue("categories") as Array<{ id: string; name: string }>;
      return categories?.map(cat => cat.name).join(", ") || "—";
    },
  },
  {
    accessorKey: 'totalStock',
    header: "Total Stock",
    cell: ({ row }) => (
      <form onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector('input') as HTMLInputElement;
        const stockValue = input?.value;
        console.log('Stock value:', stockValue);
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
          loading: `Saving...`,
          success: 'Stock Updated',
          error: 'Failed to update stock',
        })
      }}>
        <Label htmlFor={`${row.original.id}-stock`} className='sr-only'>
          {row.original.name}
        </Label>
        <Input
          className="
            hover:bg-input/30 focus-visible:bg-background
            dark:hover:bg-input/30 dark:focus-visible:bg-input/30
             h-8 w-16 border-transparent bg-transparent text-right
              shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={`${row.original.totalStock}`}
          id={`${row.original.id}-stock`}
          name={`${row.original.id}-stock`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.form?.requestSubmit();
            }
          }}
          onBlur={(e) => {
            e.currentTarget.form?.requestSubmit();
          }}
          />
      </form>
    )
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => {
      const priceRange = row.getValue("priceRange") as { min: unknown; max: unknown; currency: string };
      if (!priceRange) return "—";
      const min = Number(priceRange.min);
      const max = Number(priceRange.max);
      const currency = priceRange.currency;
      if (min === max) {
        return `${currency} ${min.toFixed(2)}`;
      }
      return `${currency} ${min.toFixed(2)} - ${max.toFixed(2)}`;
    },
  },
]


const  getProductsData = async (): Promise<Array<ProductWithVariantsAndCategories>> => {
  /* query hools to move */
  return productsPlaceholder
}

export const ProductTable = () => {
  const [data, setData] = useState<ProductWithVariantsAndCategories[]>([])

  useEffect(() => {
    getProductsData().then(setData)
  }, [])

  return (
    <DataTable columns={productColumns} data={data} />
  )
}
