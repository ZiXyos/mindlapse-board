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
      if (hasNextPage) {
        set({ pageIndex: pageIndex + 1 })
      }
    },
    
    previousPage: () => {
      const { pageIndex, hasPreviousPage } = get()
      if (hasPreviousPage) {
        set({ pageIndex: pageIndex - 1 })
      }
    },
    
    firstPage: () => {
      set({ pageIndex: 0 })
    },
    
    lastPage: () => {
      const { totalPages } = get()
      set({ pageIndex: Math.max(0, totalPages - 1) })
    },
    
    reset: () => {
      set({ pageIndex: 0, pageSize: 10, total: 0 })
    },
    
    getQueryParams: (): PaginationQuery => {
      const { pageIndex, pageSize } = get()
      return {
        page: pageIndex + 1,
        limit: pageSize
      }
    },
    
    updateFromResponse: (response: PaginatedResponse<any>) => {
      const { meta } = response
      set({
        pageIndex: meta.page - 1,
        pageSize: meta.limit,
        total: meta.total
      })
    }
  }))
)