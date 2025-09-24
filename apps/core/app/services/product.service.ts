import { ProductRepository } from '#repositories/product.repository'
import { Product } from '@mindboard/shared'
import { inject } from '@adonisjs/core'

@inject()
export default class ProductService {
  constructor(protected productRepository: ProductRepository) {}

  async getProducts(): Promise<Array<Product>> {
    return this.productRepository.getAll()
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.getById(id)
  }
}
