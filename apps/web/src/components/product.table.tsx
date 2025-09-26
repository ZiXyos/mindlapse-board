import React from "react";
import type {ColumnDef} from "@tanstack/react-table";
import type {ProductWithVariantsAndCategories, PaginatedResponse, PaginationParams} from "@mindboard/shared";
import {DataTable} from "@shared/ui/components/data.table";
import {useQuery} from "@tanstack/react-query";
import {productsPlaceholder} from "./dummy";
import { toast } from 'sonner'
import {Label} from "@shared/ui/components/ui/label";
import { Input} from "@shared/ui/components/ui/input";
import { usePaginationController } from "@shared/ui/hooks/use-pagination-controller";

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


const getProductsData = async (params: PaginationParams): Promise<PaginatedResponse<ProductWithVariantsAndCategories>> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const offset = (page - 1) * limit;
  
  const paginatedData = productsPlaceholder.slice(offset, offset + limit);
  const total = productsPlaceholder.length;
  const lastPage = Math.ceil(total / limit);
  
  return {
    data: paginatedData,
    meta: {
      currentPage: page,
      perPage: limit,
      total,
      lastPage,
      hasNext: page < lastPage,
      hasPrev: page > 1,
    }
  };
}

export const ProductTable = () => {
  const { pagination, queryParams, updateFromResponse, setTotal } = usePaginationController();
  
  const { data: queryResult, isLoading, isError } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProductsData(queryParams),
    keepPreviousData: true,
  });

  React.useEffect(() => {
    if (queryResult?.meta?.total !== undefined) {
      setTotal(queryResult.meta.total);
    }
  }, [queryResult?.meta?.total, setTotal]);

  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <DataTable 
      columns={productColumns} 
      data={queryResult?.data || []} 
      isLoading={isLoading}
      pagination={pagination}
    />
  );
}
