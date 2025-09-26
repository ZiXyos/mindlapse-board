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

export type ProductListItem = {
  id: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date | null
  variants: Array<{
    id: string
    sku: string
    name: string
    price: number
    currency: Currency
    stockQuantity: number
    isInStock: boolean
    isDefault: boolean
    options: Record<string, string>
  }>
  defaultVariant?: {
    id: string
    price: number
    currency: Currency
    stockQuantity: number
    isInStock: boolean
  }
  priceRange?: {
    min: number
    max: number
    currency: Currency
  }
  categories: Array<{
    id: string
    name: string
  }>
  variantCount: number
  totalStock: number
}
