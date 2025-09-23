import { inject } from '@adonisjs/core'

import CreateProduct from '#services/create_product'
import { CreateProductCommand } from '#commands/product_commands'
import { ProductRepository } from '#repositories/product_repository'

@inject()
export default class CreateProductService {
  constructor(
    protected createProduct: CreateProduct,
    protected productRepository: ProductRepository
  ) {}

  async execute(_product: any /* dto */): Promise<Record<string, string>> {
    let command = new CreateProductCommand()
    let product = this.createProduct.execute(command)

    return await this.productRepository.create(product)
  }
}
