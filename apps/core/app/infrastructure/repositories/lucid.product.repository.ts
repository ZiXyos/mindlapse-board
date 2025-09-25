import { inject } from '@adonisjs/core'

import { ProductRepository } from '#repositories/product.repository'
import ProductEntity from '#entities/product.entity'
import ProductModel from '#models/product.model'
import { LucidProductQueryBuilder } from '#lucidQueries//lucid.product.query.builder'
import { ProductQueryBuilder } from '#queries/product.queries.builder'

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

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      isActive: product.isActive,
      createdAt: product.createdAt.toISO(),
      updatedAt: product.updatedAt?.toISO() || null,
    } satisfies Product
  }

  async update(id: Identifer, product: ProductEntity): Promise<Product> {
    const existingProduct = await ProductModel.findByOrFail(id)

    const updateData = product.toModel()
    existingProduct.merge(updateData)
    await existingProduct.save()

    return {
      id: existingProduct.id,
      name: existingProduct.name,
      slug: existingProduct.slug,
      description: existingProduct.description,
      isActive: existingProduct.isActive,
      createdAt: existingProduct.createdAt.toISO(),
      updatedAt: existingProduct.updatedAt?.toISO() || null,
    } satisfies Product
  }

  query(): ProductQueryBuilder {
    return new LucidProductQueryBuilder()
  }
}
