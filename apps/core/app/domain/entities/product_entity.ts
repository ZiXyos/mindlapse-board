import logger from '@adonisjs/core/services/logger'

export default class ProductEntity {
  private constructor(
    private readonly id: string,
    private name: string
  ) {}

  static create(): ProductEntity {
    return new ProductEntity('id-001', 'simple-product')
  }

  update(product: ProductEntity) {
    logger.info(`Update product with id ${product.id}`)
    this.name = product.name
  }
}
