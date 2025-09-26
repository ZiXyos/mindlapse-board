import React from 'react'
import { useTablePaginationStore } from '../stores/pagination.store'

export function usePaginationController() {
  const store = useTablePaginationStore()
  
  const updateFromSharedResponse = React.useCallback((response: any) => {
    const { data, meta } = response
    if (meta?.total !== store.total) {
      store.setTotal(meta.total)
    }
    if (meta?.currentPage && (meta.currentPage - 1) !== store.pageIndex) {
      store.setPageIndex(meta.currentPage - 1)
    }
  }, [store.setTotal, store.setPageIndex, store.total, store.pageIndex])
  
  const pagination = React.useMemo(() => ({
    pageIndex: store.pageIndex,
    pageSize: store.pageSize,
    totalPages: store.totalPages,
    totalRows: store.total,
    hasNextPage: store.hasNextPage,
    hasPreviousPage: store.hasPreviousPage,
    onPageIndexChange: store.setPageIndex,
    onPageSizeChange: store.setPageSize,
    onFirstPage: store.firstPage,
    onLastPage: store.lastPage,
    onNextPage: store.nextPage,
    onPreviousPage: store.previousPage,
  }), [
    store.pageIndex,
    store.pageSize,
    store.totalPages,
    store.total,
    store.hasNextPage,
    store.hasPreviousPage,
    store.setPageIndex,
    store.setPageSize,
    store.firstPage,
    store.lastPage,
    store.nextPage,
    store.previousPage,
  ])
  
  const queryParams = React.useMemo(() => store.getQueryParams(), [
    store.pageIndex,
    store.pageSize
  ])
  
  return {
    pagination,
    queryParams,
    updateFromResponse: updateFromSharedResponse,
    setTotal: store.setTotal,
  }
}