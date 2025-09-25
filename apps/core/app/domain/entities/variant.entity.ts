import { domain, ProductVariant } from '@mindboard/shared'
import { randomUUID } from 'node:crypto'
import { Currency, VariantOptions, PricesJson } from '#models/variant.model'
import ProductVariantModel from '#models/variant.model'

export default class VariantEntity {
  private constructor(
    private readonly _id: string,
    private readonly _productId: string,
    private _name: string,
    private _sku: string,
    private _options: VariantOptions,
    private _price: number,
    private _stockQuantity: number,
    private _currency: Currency,
    private _pricesJson: PricesJson,
    private _isDefault: boolean,
    private _position?: number
  ) {}

  get id() {
    return this._id
  }

  get productId() {
    return this._productId
  }

  get name() {
    return this._name
  }

  get sku() {
    return this._sku
  }

  get options() {
    return this._options
  }

  get price() {
    return this._price
  }

  get stockQuantity() {
    return this._stockQuantity
  }

  get currency() {
    return this._currency
  }

  get pricesJson() {
    return this._pricesJson
  }

  get isDefault() {
    return this._isDefault
  }

  get position() {
    return this._position
  }

  static create(
    productId: string,
    name: string,
    sku: string,
    options: VariantOptions,
    price: number,
    stockQuantity: number,
    currency: Currency,
    pricesJson: PricesJson,
    isDefault: boolean,
    position?: number,
    id?: string
  ): VariantEntity {
    return new VariantEntity(
      id || randomUUID(),
      productId,
      name,
      sku,
      options,
      price,
      stockQuantity,
      currency,
      pricesJson,
      isDefault,
      position || 1
    )
  }

  toModel(): Partial<ProductVariantModel> {
    return {
      id: this._id,
      productId: this._productId,
      name: this._name,
      sku: this._sku,
      options: this._options,
      price: this._price,
      stockQuantity: this._stockQuantity,
      currency: this._currency,
      pricesJson: this._pricesJson,
      isDefault: this._isDefault,
      position: this._position,
    }
  }

  toProductVariant(): ProductVariant {
    const cleanPriceJson = Object.fromEntries(
      Object.entries(this._pricesJson).map(([c, p]) => [c, domain.Price(p)])
    )

    return {
      id: domain.Identifier(this._id),
      productId: domain.Identifier(this._productId),
      sku: this._sku,
      name: this._name,
      options: this._options,
      position: this._position || 1,
      price: domain.Price(this._price),
      stockQuantity: this._stockQuantity,
      currency: this._currency,
      pricesJson: cleanPriceJson,
      isDefault: this._isDefault,
    }
  }

  static from(variant: ProductVariantModel): VariantEntity {
    return new VariantEntity(
      variant.id,
      variant.productId,
      variant.name,
      variant.sku,
      variant.options,
      variant.price,
      variant.stockQuantity,
      variant.currency,
      variant.pricesJson,
      variant.isDefault,
      variant.position
    )
  }
}
