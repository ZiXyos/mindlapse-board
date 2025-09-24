import type { BaseEntity } from './common'
import type { Category } from './category'
import type { Currency } from "./currency";
import type { ProductVariant } from './variant'

export type Product = {
  name: string
  slug: string
  description: string | null
  isActive: boolean
} & BaseEntity

export type ProductWithRelations = {
  variants: ProductVariant[]
  categories: Category[]
} & Product

export type ProductWithVariantsAndCategories = {
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
} & Product

export type CreateProductPayload = {
  name: string
  slug: string
  description?: string | null
  isActive?: boolean
  categoryIds?: string[]
}

export type UpdateProductPayload = {
  name?: string
  slug?: string
  description?: string | null
  isActive?: boolean
  categoryIds?: string[]
}

export type ProductFilters = {
  name?: string
  slug?: string
  isActive?: boolean
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  currency?: Currency
}

export type ProductSortOptions = {
  field: 'name' | 'createdAt' | 'updatedAt' | 'price'
  direction: 'asc' | 'desc'
}

export type ProductListItem = {
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
