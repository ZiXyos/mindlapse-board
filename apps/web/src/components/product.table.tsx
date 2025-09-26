import React, { useState, useMemo, useCallback } from "react";
import type {ColumnDef} from "@tanstack/react-table";
import type {ProductListItem} from "@mindboard/shared";
import {DataTable} from "@shared/ui/components/data.table";
import { toast } from 'sonner'
import {Label} from "@shared/ui/components/ui/label";
import { Input} from "@shared/ui/components/ui/input";
import { Button } from "@shared/ui/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/components/ui/select";
import { Badge } from "@shared/ui/components/ui/badge";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { usePaginationController } from "@shared/ui/hooks/use-pagination-controller";
import { useProductsSearch, useProductsList, useProducts } from "../hooks/api/useProducts";
import type { ProductQueryRequest, ProductFilters } from "@mindboard/shared";
import { TablePagination } from "@shared/ui/components/table-pagination";

const VariantRow = ({ variant, onStockUpdate }: {
  variant: ProductListItem['variants'][0],
  onStockUpdate: (variantId: string, newStock: number) => void
}) => {
  return (
  <tr className="bg-background border-l-4 border-l-muted-foreground/20 hover:bg-muted/50 transition-colors">
    <td className="px-6 py-3 text-sm text-muted-foreground">└ {variant.sku}</td>
    <td className="px-6 py-3 text-sm">
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{variant.name}</span>
        {Object.keys(variant.options).length > 0 && (
          <div className="flex gap-1 mt-1">
            {Object.entries(variant.options).map(([key, value]) => (
              <Badge key={key} variant="outline" className="text-xs">
                {key}: {value}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </td>
    <td className="px-6 py-3 text-sm text-muted-foreground">—</td>
    <td className="px-6 py-3">
      <form onSubmit={async (e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector('input') as HTMLInputElement;
        const stockValue = parseInt(input?.value || '0');

        try {
          await onStockUpdate(variant.id, stockValue);
          toast.success('Stock Updated');
        } catch (error) {
          toast.error('Failed to update stock');
          input.value = variant.stockQuantity.toString();
        }
      }}>
        <Label htmlFor={`${variant.id}-stock`} className='sr-only'>
          {variant.name} Stock
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border hover:bg-muted/50"
          defaultValue={`${variant.stockQuantity}`}
          id={`${variant.id}-stock`}
          name={`${variant.id}-stock`}
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
    </td>
    <td className="px-6 py-3 text-sm text-foreground">{variant.currency} {variant.price.toFixed(2)}</td>
  </tr>
)}

const createProductColumns = (
  onSortChange: (field: keyof ProductListItem) => void,
  expandedRows: Set<string>,
  toggleRow: (productId: string) => void,
  onVariantStockUpdate: (variantId: string, newStock: number) => void
): Array<ColumnDef<ProductListItem>> => [
  {
    accessorKey: "name",
    header: () => (
      <Button
        variant="ghost"
        onClick={() => onSortChange('name')}
        className="h-auto p-0 font-medium hover:bg-transparent"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.original;
      const isExpanded = expandedRows.has(product.id);
      const hasVariants = product.variants.length > 1;

      return (
        <div className="flex items-center gap-2">
          {hasVariants && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleRow(product.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          <div className="font-medium">{row.getValue("name")}</div>
          {hasVariants && (
            <Badge variant="secondary" className="text-xs">
              {product.variants.length} variants
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null;
      return description || "—";
    },
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories = row.getValue("categories") as Array<{ id: string; name: string }>;
      return (
        <div className="flex gap-1 flex-wrap">
          {categories?.map(cat => (
            <Badge key={cat.id} variant="secondary" className="text-xs">
              {cat.name}
            </Badge>
          )) || "—"}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalStock',
    header: () => (
      <Button
        variant="ghost"
        onClick={() => onSortChange('totalStock')}
        className="h-auto p-0 font-medium hover:bg-transparent"
      >
        Total Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.original;
      const hasMultipleVariants = product.variants.length > 1;

      return (
        <div className="text-right">
          <div className="font-medium">{product.totalStock}</div>
          {hasMultipleVariants && (
            <div className="text-xs text-muted-foreground">
              across {product.variants.length} variants
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "priceRange",
    header: () => (
      <Button
        variant="ghost"
        onClick={() => onSortChange('totalStock')}
        className="h-auto p-0 font-medium hover:bg-transparent"
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.original;
      const priceRange = product.priceRange;

      if (!priceRange || product.variants.length === 0) return "—";

      if (priceRange.min === priceRange.max) {
        return `${priceRange.currency} ${priceRange.min.toFixed(2)}`;
      }

      return (
        <div>
          <div className="font-medium">
            {priceRange.currency} {priceRange.min.toFixed(2)} - {priceRange.max.toFixed(2)}
          </div>
          {product.variants.length > 1 && (
            <div className="text-xs text-muted-foreground">
              {product.variants.length} price points
            </div>
          )}
        </div>
      );
    },
  },
]

export const ProductTable = () => {
  const { pagination, queryParams, setTotal } = usePaginationController();
  const { updateProduct } = useProducts();
  const [sortOrder, setSortOrder] = useState<{
    field: keyof ProductListItem
    direction: 'asc' | 'desc'
  }>({
    field: 'name',
    direction: 'asc'
  });

  const [filters, setFilters] = useState<ProductFilters>({
    isActive: true,
  });

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const queryPayload: ProductQueryRequest = useMemo(() => ({
    page: queryParams.page,
    limit: queryParams.limit,
    sort: {
      field: sortOrder.field,
      direction: sortOrder.direction
    },
    filters: filters
  }), [queryParams, sortOrder, filters]);

  const {
    data: queryResult,
    isLoading,
    isError,
    error
  } = useProductsSearch(queryPayload);

  const { data: simpleResult } = useProductsList();

  const transformedData = useMemo(() => {
    const products = queryResult?.data?.data || [];
    if (!products || products.length === 0) return [];

    return products.map((product: any): ProductListItem => {
      const variants = product.variants || [];

      const transformedVariants = variants.map((variant: any) => ({
        id: variant.id,
        sku: variant.sku || '',
        name: variant.name || `Variant ${variant.id}`,
        price: variant.price / 100, // Convert cents to dollars
        currency: variant.currency || 'USD',
        stockQuantity: variant.stockQuantity || 0,
        isInStock: (variant.stockQuantity || 0) > 0,
        isDefault: variant.isDefault || false,
        options: variant.options || {}
      }));

      const prices = transformedVariants.map(v => v.price).filter(p => p > 0);
      const priceRange = prices.length > 0 ? {
        min: Math.min(...prices),
        max: Math.max(...prices),
        currency: transformedVariants[0]?.currency || 'USD'
      } : undefined;

      const defaultVariant = transformedVariants.find(v => v.isDefault) || transformedVariants[0];

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        variants: transformedVariants,
        defaultVariant: defaultVariant ? {
          id: defaultVariant.id,
          price: defaultVariant.price,
          currency: defaultVariant.currency,
          stockQuantity: defaultVariant.stockQuantity,
          isInStock: defaultVariant.isInStock
        } : undefined,
        priceRange,
        categories: product.categories || [],
        variantCount: transformedVariants.length,
        totalStock: transformedVariants.reduce((sum, v) => sum + v.stockQuantity, 0)
      };
    });
  }, [queryResult?.data?.data]);

  React.useEffect(() => {
    console.log('ProductTable Debug:', {
      queryPayload,
      queryResult,
      simpleResult,
      isLoading,
      isError,
      error,
      dataLength: queryResult?.data?.data?.length,
      simpleDataLength: simpleResult?.length,
      transformedDataLength: transformedData.length,
      transformedData: transformedData
    });
  }, [queryPayload, queryResult, simpleResult, isLoading, isError, error, transformedData]);

  React.useEffect(() => {
    const total = queryResult?.data?.meta?.total;
    console.log('Pagination Debug:', {
      total,
      totalType: typeof total,
      totalAsNumber: Number(total),
      queryResultMeta: queryResult?.data?.meta
    });

    if (total !== undefined && total !== null) {
      const totalAsNumber = Number(total);
      if (!isNaN(totalAsNumber)) {
        setTotal(totalAsNumber);
        console.log('Set total to:', totalAsNumber);
      } else {
        console.error('Invalid total value:', total);
      }
    }
  }, [queryResult?.data?.meta?.total, setTotal]);

  const handleSortChange = useCallback((field: keyof ProductListItem) => {
    setSortOrder(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const toggleRow = useCallback((productId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const handleVariantStockUpdate = useCallback(async (variantId: string, newStock: number) => {
    const product = transformedData.find(p =>
      p.variants.some(v => v.id === variantId)
    );

    if (!product) {
      console.error('Product not found for variant:', variantId);
      throw new Error('Product not found');
    }

    const updatedVariants = product.variants.map(variant =>
      variant.id === variantId
        ? { ...variant, stockQuantity: newStock }
        : variant
    );

    const updatePayload = {
      variants: updatedVariants.map(v => ({
        id: v.id,
        stockQuantity: v.stockQuantity
      }))
    };

    return updateProduct({ id: product.id, payload: updatePayload });
  }, [transformedData, updateProduct]);

  const productColumns = useMemo(() =>
    createProductColumns(handleSortChange, expandedRows, toggleRow, handleVariantStockUpdate),
    [handleSortChange, expandedRows, toggleRow, handleVariantStockUpdate]
  );

  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading products: {error?.message || 'Please try again.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          value={filters.isActive?.toString()}
          onValueChange={(value) =>
            handleFilterChange({ isActive: value === 'true' })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {productColumns.map((column, index) => (
                <th key={index} className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  {typeof column.header === 'function' ? column.header({} as any) : column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {isLoading ? (
              <tr>
                <td colSpan={productColumns.length} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : transformedData.length > 0 ? (
              transformedData.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className="hover:bg-muted/50 transition-colors">
                    {productColumns.map((column, columnIndex) => {
                      const cell = column.cell;
                      const value = cell ? cell({ row: { original: product, getValue: (key: string) => (product as any)[key] } } as any) : null;
                      return (
                        <td key={columnIndex} className="px-6 py-4 text-sm">
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                  {expandedRows.has(product.id) && product.variants.map((variant) => (
                    <VariantRow
                      key={variant.id}
                      variant={variant}
                      onStockUpdate={handleVariantStockUpdate}
                    />
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={productColumns.length} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
  );
}
