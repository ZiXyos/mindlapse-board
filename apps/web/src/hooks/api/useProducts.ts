import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type {
  CreateProductPayload,
  UpdateProductPayload,
} from "@mindboard/shared"
import type { RequestOptions } from "@mindboard/sdk/interfaces"
import { Client } from "@mindboard/sdk"

const client = new Client(
  import.meta.env.VITE_API_URL || 'http://localhost:3333'
)

interface ProductQueryFilters {
  name?: string
  isActive?: boolean
  categoryIds?: string[]
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

interface ProductQueryPayload {
  filters?: ProductQueryFilters
  search?: string
  pagination?: {
    page: number
    limit: number
  }
  sorting?: {
    field: string
    direction: 'asc' | 'desc'
  }
}

export const productQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productQueryKeys.all, 'list'] as const,
  list: (filters?: Partial<RequestOptions>) => [...productQueryKeys.lists(), { filters }] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
  query: (queryPayload?: ProductQueryPayload) => [...productQueryKeys.all, 'query', { queryPayload }] as const,
}

export const useProducts = () => {
  const queryClient = useQueryClient()

  const useProductsQuery = (options?: Partial<RequestOptions>) => {
    return useQuery({
      queryKey: productQueryKeys.list(options),
      queryFn: async () => {
        const response = await client.products.getProducts(options)
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch products')
        }
        return response.data
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }

  const useProductQuery = (id: string) => {
    return useQuery({
      queryKey: productQueryKeys.detail(id),
      queryFn: async () => {
        const response = await client.products.getProduct(id)
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch product')
        }
        return response.data
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }

  const useProductsAdvancedQuery = (queryPayload: ProductQueryPayload, options?: Partial<RequestOptions>) => {
    return useQuery({
      queryKey: productQueryKeys.query(queryPayload),
      queryFn: async () => {
        const response = await client.products.queryProducts(queryPayload, options)
        if (!response.success) {
          throw new Error(response.message || 'Failed to query products')
        }
        return response.data
      },
      enabled: !!queryPayload,
      staleTime: 1000 * 60 * 2, // 2 minutes for search results
    })
  }

  const createProductMutation = useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const response = await client.products.createProduct(payload)
      if (!response.success) {
        throw new Error(response.message || 'Failed to create product')
      }
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() })
      queryClient.setQueryData(productQueryKeys.detail(data.id), data)
    },
    onError: (error) => {
      console.error('Create product failed:', error)
    }
  })

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateProductPayload }) => {
      const response = await client.products.updateProduct(id, payload)
      if (!response.success) {
        throw new Error(response.message || 'Failed to update product')
      }
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(productQueryKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productQueryKeys.query() })
    },
    onError: (error) => {
      console.error('Update product failed:', error)
    }
  })

  const replaceProductMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateProductPayload }) => {
      const response = await client.products.replaceProduct(id, payload)
      if (!response.success) {
        throw new Error(response.message || 'Failed to replace product')
      }
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(productQueryKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productQueryKeys.query() })
    },
    onError: (error) => {
      console.error('Replace product failed:', error)
    }
  })

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await client.products.deleteProduct(id)
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete product')
      }
      return response.data
    },
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: productQueryKeys.detail(deletedId) })
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productQueryKeys.query() })
    },
    onError: (error) => {
      console.error('Delete product failed:', error)
    }
  })

  return {
    useProductsQuery,
    useProductQuery,
    useProductsAdvancedQuery,

    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    replaceProduct: replaceProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,

    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isReplacing: replaceProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,

    createProductMutation,
    updateProductMutation,
    replaceProductMutation,
    deleteProductMutation,

    createError: createProductMutation.error,
    updateError: updateProductMutation.error,
    replaceError: replaceProductMutation.error,
    deleteError: deleteProductMutation.error,
  }
}

export const useProductsList = (options?: Partial<RequestOptions>) => {
  const { useProductsQuery } = useProducts()
  return useProductsQuery(options)
}

export const useProduct = (id: string) => {
  const { useProductQuery } = useProducts()
  return useProductQuery(id)
}

export const useProductsSearch = (queryPayload: ProductQueryPayload, options?: Partial<RequestOptions>) => {
  const { useProductsAdvancedQuery } = useProducts()
  return useProductsAdvancedQuery(queryPayload, options)
}
