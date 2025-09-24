import logger from '@adonisjs/core/services/logger'
import Product from '#models/product.model'

export default class ProductEntity {
  private constructor(
    private readonly _id: string,
    private _name: string,
    private _slug: string
  ) {}

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get slug() {
    return this._slug
  }

  static create(id?: string, name?: string, slug?: string): ProductEntity {
    return new ProductEntity(
      id || 'id-001',
      name || 'simple-product',
      slug || 'simple-product'
    )
  }

  update(product: ProductEntity) {
    logger.info(`Update product with id ${product.id}`)
    this._name = product.name
  }

  toModel(): Partial<Product> {
    return {
      ...this,
    }
  }

  static from(product: Product) {
    return new ProductEntity(product.id, product.name)
  }
}
