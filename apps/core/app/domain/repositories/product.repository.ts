import ProductEntity from '#entities/product.entity'
import { inject } from '@adonisjs/core'
import { Product } from '@mindboard/shared'

@inject()
export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<Product>
}
