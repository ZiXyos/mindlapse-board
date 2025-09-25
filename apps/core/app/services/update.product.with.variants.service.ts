import { inject } from '@adonisjs/core'
import Database from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'

import { ProductRepository } from '#repositories/product.repository'
import UpdateProduct from '#services/update.product'
import UpdateVariant from '#services/update.variant'
import ProductActivation from '#services/product.activation'
import ProductModel from '#models/product.model'

import { UpdateProductWithVariantsCommand } from '#commands/variant.commands'
import ProductEntity from '#entities/product.entity'

type ProductWithRelations = {
  id: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string | null
  variants: Array<{
    id: string
    name: string
    sku: string
    stockQuantity: number
    price: number
    currency: string
    isDefault: boolean
  }>
}

@inject()
export default class UpdateProductWithVariantsService {
  constructor(
    protected productRepository: ProductRepository,
    protected updateProductService: UpdateProduct,
    protected updateVariantService: UpdateVariant,
    protected productActivation: ProductActivation
  ) {}

  async execute(command: UpdateProductWithVariantsCommand): Promise<ProductWithRelations> {
    logger.info('updating product with variants', { productId: command.id })

    return Database.transaction(async (trx) => {
      try {
        const existingProduct = await ProductModel.query({ client: trx })
          .where('id', command.id)
          .preload('variants')
          .preload('categories')
          .firstOrFail()

        let updatedProduct = existingProduct
        if (this.hasProductUpdates(command)) {
          const productEntity = this.updateProductService.execute(
            command,
            ProductEntity.from(existingProduct)
          )

          updatedProduct.merge(productEntity.toModel())
          await updatedProduct.save()
        }

        const variantsArray = existingProduct.variants
        if (command.variants && command.variants.length > 0) {
          await Promise.all(
            command.variants.map(async (variantCommand) => {
              const existingVariant = variantsArray.find((v) => v.id === variantCommand.id)
              if (!existingVariant) {
                throw new Error(`Variant with id ${variantCommand.id} not found`)
              }

              const updateData = this.updateVariantService.execute(variantCommand)
              existingVariant.merge(updateData)
              await existingVariant.save()
            })
          )
        }

        await updatedProduct.load('variants')
        const { wasDeactivated, wasReactivated } = await this.productActivation.execute(
          updatedProduct,
          command
        )

        if (wasDeactivated || wasReactivated) {
          await updatedProduct.save()
        }

        logger.info('successfully updated product with variants', {
          productId: command.id,
          variantCount: updatedProduct.variants.length,
          wasDeactivated,
          wasReactivated,
        })

        return {
          id: updatedProduct.id,
          name: updatedProduct.name,
          slug: updatedProduct.slug,
          description: updatedProduct.description,
          isActive: updatedProduct.isActive,
          createdAt: updatedProduct.createdAt.toISO() || new Date().toISOString(),
          updatedAt: updatedProduct.updatedAt?.toISO() || null,
          variants: updatedProduct.variants.map((variant) => ({
            id: variant.id,
            name: variant.name,
            sku: variant.sku,
            stockQuantity: variant.stockQuantity,
            price: variant.price,
            currency: variant.currency,
            isDefault: variant.isDefault,
          })),
        }
      } catch (error) {
        logger.error('failed to update product with variants', { error, command })
        throw error
      }
    })
  }

  private hasProductUpdates(command: UpdateProductWithVariantsCommand): boolean {
    return !!(
      command.name ||
      command.slug ||
      command.description !== undefined ||
      command.isActive !== undefined ||
      command.categoryIds
    )
  }
}
