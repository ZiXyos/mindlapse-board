import ProductEntity from '#entities/product.entity'
import { inject } from '@adonisjs/core'
import type { Identifer, Product } from '@mindboard/shared'

@inject()
export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<Product>
  abstract getAll(): Promise<Array<Product>>
  abstract getById(id: Identifer): Promise<Product | null>
}
