import type { BaseEntity } from './common'
import type { Currency } from './currency'
import { Identifer } from './identifier'
import { Price } from './price'

export type VariantOptions = Record<string, string>
export type PricesJson = Record<Currency, number>

export type ProductVariant = {
  productId: Identifer
  sku: string
  name: string
  options: VariantOptions
  position: number
  price: Price
  stockQuantity: number
  currency: Currency
  pricesJson: PricesJson
  isDefault: boolean
} & BaseEntity

export type ProductVariantWithProduct = {
  product: {
    id: Identifer
    name: string
    slug: string
  }
} & ProductVariant

export type CreateVariantPayload = {
  productId: Identifer
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

export type UpdateVariantPayload = {
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

export type VariantFilters = {
  productId?: Identifer
  sku?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  currency?: Currency
}

export type StockAdjustment = {
  variantId: Identifer
  quantity: number
  operation: 'increase' | 'decrease' | 'set'
}
