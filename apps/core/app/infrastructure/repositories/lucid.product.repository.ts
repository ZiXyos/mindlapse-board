import { inject } from '@adonisjs/core'

import { ProductRepository } from '#repositories/product.repository'
import ProductEntity from '#entities/product.entity'
import ProductModel from '#models/product.model'

import type { Identifer, Product } from '@mindboard/shared'

@inject()
export class LucidProductRepository implements ProductRepository {
  async create(product: ProductEntity): Promise<Product> {
    const createdProduct = await ProductModel.create(product.toModel())

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

  async getAll(): Promise<Array<Product>> {
    const products = await ProductModel.all()
    const productsEntities = products.map((product) => ProductEntity.from(product))

    return productsEntities.map((v) => v)
  }

  async getById(id: Identifer): Promise<Product | null> {
    const product = await ProductModel.findBy({ id: id })
    if (!product) {
      return null
    }

    const entity = ProductEntity.from(product)

    return {
      id: entity.id,
      slug: entity.slug,
      description: '',
      isActive: true,
    }
  }
}
