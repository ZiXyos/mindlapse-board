import { ProductRepository } from '#repositories/product_repository'
import ProductEntity from '#entities/product_entity'
import { inject } from '@adonisjs/core'

@inject()
export class LucidProductRepository implements ProductRepository {
  async create(product: ProductEntity): Promise<Record<string, string>> {
    return {
      id: product.id,
      name: product.name,
    }
  }
}
