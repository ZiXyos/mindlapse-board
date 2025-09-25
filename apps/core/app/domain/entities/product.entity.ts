import logger from '@adonisjs/core/services/logger'
import ProductModel from '#models/product.model'

export default class ProductEntity {
  private constructor(
    private readonly _id: string,
    private _name: string,
    private _slug: string,
    private _description: string
    // TODO: Add creation date + update date
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

  static create(id?: string, name?: string, slug?: string, description?: string): ProductEntity {
    return new ProductEntity(
      id || 'id-001',
      name || 'simple-product',
      slug || 'simple-product',
      description || 'Default description'
    )
  }

  update(product: ProductEntity) {
    logger.info(`Update product with id ${product.id}`)
    this._name = product.name
  }

  toModel(): Partial<ProductModel> {
    return {
      id: this._id,
      name: this._name,
      slug: this._slug,
      description: this._description,
    }
  }

  static from(product: ProductModel) {
    return new ProductEntity(product.id, product.name, product.slug, product.description || '')
  }
}
