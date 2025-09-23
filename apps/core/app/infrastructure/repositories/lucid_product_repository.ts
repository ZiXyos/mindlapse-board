import { ProductRepository } from '#repositories/product_repository'
import ProductEntity from '#entities/product_entity'

export class LucidProductRepository implements ProductRepository {
  async create(product: ProductEntity): Promise<ProductEntity> {
    return product
  }
}
