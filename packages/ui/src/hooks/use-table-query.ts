import { useEffect } from 'react'
import { useTablePaginationStore } from '../stores/pagination.store'
import { PaginatedResponse } from '../types/pagination'

export function useTableQuery<T>(
  queryResult: {
    data?: PaginatedResponse<T>
    isLoading: boolean
    isError: boolean
  }
) {
  const store = useTablePaginationStore()
  
  useEffect(() => {
    if (queryResult.data) {
      store.updateFromResponse(queryResult.data)
    }
  }, [queryResult.data, store])
  
  return {
    ...store,
    data: queryResult.data?.data || [],
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    queryParams: store.getQueryParams()
  }
}