export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface PaginationMeta {
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginationQuery {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    perPage: number
    total: number
    lastPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface TablePaginationStore {
  pageIndex: number
  pageSize: number
  total: number
  
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  
  setPageIndex: (pageIndex: number) => void
  setPageSize: (pageSize: number) => void
  setTotal: (total: number) => void
  nextPage: () => void
  previousPage: () => void
  firstPage: () => void
  lastPage: () => void
  reset: () => void
  
  getQueryParams: () => PaginationQuery
  updateFromResponse: (response: PaginatedResponse<any>) => void
}