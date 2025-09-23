import type { BaseEntity, Currency } from './common'

export type VariantOptions = Record<string, string>
export type PricesJson = Record<Currency, number>

export interface ProductVariant extends BaseEntity {
  productId: string
  sku: string
  name: string
  options: VariantOptions
  position: number
  price: number
  stockQuantity: number
  currency: Currency
  pricesJson: PricesJson
  isDefault: boolean
}

export interface ProductVariantWithProduct extends ProductVariant {
  product: {
    id: string
    name: string
    slug: string
  }
}

export interface CreateVariantPayload {
  productId: string
  sku: string
  name: string
  options: VariantOptions
  position?: number
  price: number
  stockQuantity?: number
  currency?: Currency
  pricesJson?: PricesJson
  isDefault?: boolean
}

export interface UpdateVariantPayload {
  sku?: string
  name?: string
  options?: VariantOptions
  position?: number
  price?: number
  stockQuantity?: number
  currency?: Currency
  pricesJson?: PricesJson
  isDefault?: boolean
}

export interface VariantFilters {
  productId?: string
  sku?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  currency?: Currency
}

export interface StockAdjustment {
  variantId: string
  quantity: number
  operation: 'increase' | 'decrease' | 'set'
}