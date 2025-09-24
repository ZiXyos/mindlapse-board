export type UserRole = 'ADMIN' | 'USER'

export interface BaseEntity {
  id: string
  createdAt: string | Date
  updatedAt: string | Date | null
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationMeta {
  currentPage: number
  perPage: number
  total: number
  lastPage: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface ApiResponse<T = any> {
  success: boolean
  code: number
  data?: T
  message?: string
  errors?: Record<string, string[]>
}
