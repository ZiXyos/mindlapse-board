import { inject } from '@adonisjs/core'

import CreateProduct from '#services/create_product'
import { CreateProductCommand } from '#commands/product_commands'
import { ProductRepository } from '#repositories/product_repository'
import logger from '@adonisjs/core/services/logger'

import type { CreateProductPayload, Product } from '@mindboard/shared'

@inject()
export default class CreateProductService {
  constructor(
    protected createProduct: CreateProduct,
    protected productRepository: ProductRepository
  ) {}

  async execute(productData: CreateProductPayload): Promise<Product> {
    logger.info('creating product', productData)
    let command = new CreateProductCommand()
    let res = this.createProduct.execute(command)

    return (await this.productRepository.create(res)) as unknown as Product
  }
}
