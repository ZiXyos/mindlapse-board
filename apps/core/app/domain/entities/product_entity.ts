import logger from '@adonisjs/core/services/logger'

export default class ProductEntity {
  private constructor(
    private readonly _id: string,
    private _name: string
  ) {}

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  static create(): ProductEntity {
    return new ProductEntity('id-001', 'simple-product')
  }

  update(product: ProductEntity) {
    logger.info(`Update product with id ${product.id}`)
    this._name = product.name
  }
}
