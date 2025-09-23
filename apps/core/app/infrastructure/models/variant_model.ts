import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Product from '#models/product_model'

export type VariantOptions = Record<string, string>
export type PricesJson = Record<string, number>
export type Currency = 'EUR' | 'USD' | 'KRW' | 'JPY'

export default class ProductVariant extends BaseModel {
  static table = 'product_variants'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare productId: string

  @column()
  declare sku: string

  @column()
  declare name: string

  @column({
    prepare: (value: VariantOptions) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare options: VariantOptions

  @column()
  declare position: number

  @column()
  declare price: number

  @column()
  declare stockQuantity: number

  @column()
  declare currency: Currency

  @column({
    prepare: (value: PricesJson) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare pricesJson: PricesJson

  @column()
  declare isDefault: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  public getPrice(currency: Currency = 'EUR'): number {
    if (currency === this.currency) {
      return this.price
    }

    return this.pricesJson[currency] || this.price
  }

  public isInStock(): boolean {
    return this.stockQuantity > 0
  }

  public getDisplayName(): string {
    const optionValues = Object.values(this.options).filter(Boolean)
    if (optionValues.length === 0) return this.name

    return `${this.name} (${optionValues.join(', ')})`
  }

  public decreaseStock(quantity: number): void {
    this.stockQuantity = Math.max(0, this.stockQuantity - quantity)
  }

  public increaseStock(quantity: number): void {
    this.stockQuantity += quantity
  }
}
