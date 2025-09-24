import { ProductRepository } from '#repositories/product.repository'
import ProductEntity from '#entities/product.entity'
import { inject } from '@adonisjs/core'
import Product from '#models/product.model'

@inject()
export class LucidProductRepository implements ProductRepository {
  async create(product: ProductEntity): Promise<Record<string, string>> {
    const createdProduct = await Product.create({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: null,
      isActive: true,
    })

    return {
      id: createdProduct.id,
      name: createdProduct.name,
    }
  }
}
