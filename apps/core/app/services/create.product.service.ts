import { inject } from '@adonisjs/core'

import CreateProduct from '#services/create.product'
import { CreateProductCommand } from '#commands/product.commands'
import { ProductRepository } from '#repositories/product.repository'
import logger from '@adonisjs/core/services/logger'

import { CreateProductDTO, type Product } from '@mindboard/shared'

@inject()
export default class CreateProductService {
  constructor(
    protected createProduct: CreateProduct,
    protected productRepository: ProductRepository
  ) {}

  async execute(productData: CreateProductDTO): Promise<Product> {
    logger.info('creating product', productData)

    const slug = productData.slug || productData.name.toLowerCase().replace(/\s+/g, '-')

    const command = new CreateProductCommand(
      productData.name,
      slug,
      productData.description,
      productData.categoryIds
    )

    const productEntity = this.createProduct.execute(command)
    return await this.productRepository.create(productEntity)
  }
}
