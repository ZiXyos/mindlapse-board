import type { BaseEntity, Currency } from './common'
import type { Category } from './category'
import type { ProductVariant } from './variant'

export interface Product extends BaseEntity {
  name: string
  slug: string
  description: string | null
  isActive: boolean
}

export interface ProductWithRelations extends Product {
  variants: ProductVariant[]
  categories: Category[]
}

export interface ProductWithVariantsAndCategories extends Product {
  variants: ProductVariant[]
  categories: Array<{
    id: string
    name: string
  }>
  defaultVariant?: ProductVariant
  priceRange?: {
    min: number
    max: number
    currency: Currency
  }
  totalStock?: number
}

export interface CreateProductPayload {
  name: string
  slug: string
  description?: string | null
  isActive?: boolean
  categoryIds?: string[]
}

export interface UpdateProductPayload {
  name?: string
  slug?: string
  description?: string | null
  isActive?: boolean
  categoryIds?: string[]
}

export interface ProductFilters {
  name?: string
  slug?: string
  isActive?: boolean
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  currency?: Currency
}

export interface ProductSortOptions {
  field: 'name' | 'createdAt' | 'updatedAt' | 'price'
  direction: 'asc' | 'desc'
}

export interface ProductListItem {
  id: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date | null
  defaultVariant?: {
    id: string
    price: number
    currency: Currency
    stockQuantity: number
    isInStock: boolean
  }
  categories: Array<{
    id: string
    name: string
  }>
  variantCount: number
  totalStock: number
}