import type { BaseEntity } from './common'

export interface Category extends BaseEntity {
  name: string
}

export interface CategoryWithProducts extends Category {
  products: Array<{
    id: string
    name: string
    slug: string
  }>
}

export interface CreateCategoryPayload {
  name: string
}

export interface UpdateCategoryPayload {
  name?: string
}

export interface CategoryFilters {
  name?: string
}