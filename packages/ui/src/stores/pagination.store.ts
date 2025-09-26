import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { TablePaginationStore, PaginatedResponse, PaginationQuery } from '../types/pagination'

export const useTablePaginationStore = create<TablePaginationStore>()(
  subscribeWithSelector((set, get) => ({
    pageIndex: 0,
    pageSize: 10,
    total: 0,
    
    get totalPages() {
      const { total, pageSize } = get()
      return Math.ceil(total / pageSize)
    },
    
    get hasNextPage() {
      const { pageIndex, totalPages } = get()
      return pageIndex < totalPages - 1
    },
    
    get hasPreviousPage() {
      const { pageIndex } = get()
      return pageIndex > 0
    },
    
    setPageIndex: (pageIndex: number) => {
      const current = get()
      const newIndex = Math.max(0, pageIndex)
      if (current.pageIndex !== newIndex) {
        set({ pageIndex: newIndex })
      }
    },
    
    setPageSize: (pageSize: number) => {
      set({ pageSize, pageIndex: 0 })
    },
    
    setTotal: (total: number) => {
      const current = get()
      if (current.total !== total) {
        set({ total })
      }
    },
    
    nextPage: () => {
      const { pageIndex, hasNextPage } = get()
      console.log('nextPage called:', { pageIndex, hasNextPage })
      if (hasNextPage) {
        const newPageIndex = pageIndex + 1
        console.log('Moving to next page:', newPageIndex)
        set({ pageIndex: newPageIndex })
      } else {
        console.log('Cannot go to next page - already at last page')
      }
    },
    
    previousPage: () => {
      const { pageIndex, hasPreviousPage } = get()
      console.log('previousPage called:', { pageIndex, hasPreviousPage })
      if (hasPreviousPage) {
        const newPageIndex = pageIndex - 1
        console.log('Moving to previous page:', newPageIndex)
        set({ pageIndex: newPageIndex })
      } else {
        console.log('Cannot go to previous page - already at first page')
      }
    },
    
    firstPage: () => {
      console.log('firstPage called')
      set({ pageIndex: 0 })
    },

    lastPage: () => {
      const { totalPages } = get()
      console.log('lastPage called:', { totalPages, targetPageIndex: totalPages - 1 })
      set({ pageIndex: Math.max(0, totalPages - 1) })
    },
    
    reset: () => {
      set({ pageIndex: 0, pageSize: 10, total: 0 })
    },
    
    getQueryParams: (): PaginationQuery => {
      const { pageIndex, pageSize } = get()
      const queryParams = {
        page: pageIndex + 1,
        limit: pageSize
      }
      console.log('getQueryParams called:', { pageIndex, pageSize, queryParams })
      return queryParams
    },
    
    updateFromResponse: (response: PaginatedResponse<any>) => {
      console.log('Store updateFromResponse called with:', response)
      const { meta } = response
      console.log('Extracted meta:', meta)

      const newState = {
        pageIndex: meta.currentPage - 1,
        pageSize: meta.perPage,
        total: meta.total
      }
      console.log('Setting new pagination state:', newState)
      console.log('Calculated totalPages:', Math.ceil(meta.total / meta.perPage))

      set(newState)
    }
  }))
)