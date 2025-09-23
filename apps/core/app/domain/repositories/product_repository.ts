import ProductEntity from '#entities/product_entity'
import { inject } from '@adonisjs/core'

@inject()
export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<Record<string, string>>
}
