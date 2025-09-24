import { ProductRepository } from '#repositories/product.repository'
import ProductEntity from '#entities/product.entity'
import { inject } from '@adonisjs/core'
import ProductModel from '#models/product.model'
import { type Product } from '@mindboard/shared'

@inject()
export class LucidProductRepository implements ProductRepository {
  async create(product: ProductEntity): Promise<Product> {
    const createdProduct = await ProductModel.create(product.toModel())
    const createdProductEntity = ProductEntity.from(createdProduct)

    return {
      id: createdProduct.id,
      name: createdProduct.name,
      slug: createdProduct.slug,
      description: createdProduct.description,
      isActive: createdProduct.isActive,
      createdAt: createdProduct.createdAt.toISO(),
      updatedAt: createdProduct.updatedAt?.toISO() || null,
    } satisfies Product
  }
}
