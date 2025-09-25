import { inject } from '@adonisjs/core'

import ProductEntity from '#entities/product.entity'
import { ProductQueryBuilder } from '#queries/product.queries.builder'

import type { Identifer, Product } from '@mindboard/shared'

@inject()
export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<Product>
  abstract getAll(): Promise<Array<Product>>
  abstract getById(id: Identifer): Promise<Product | null>
  abstract query(): ProductQueryBuilder
}
