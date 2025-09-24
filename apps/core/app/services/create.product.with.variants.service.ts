import { inject } from '@adonisjs/core'
import Database from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'

import CreateProductService from '#application/create.product.service'
import CreateVariantService from '#application/create.variant.service'
import { CreateVariantCommand } from '#commands/variant.commands'

import { CreateProductWithVariantsDTO, CreateVariantDTO, Product } from '@mindboard/shared'
import CurrencyConverterService from './currency.converter.service.js'

@inject()
export default class CreateProductWithVariantsService {
  constructor(
    protected createProductService: CreateProductService,
    protected createVariantService: CreateVariantService,
    protected currencyConverterService: CurrencyConverterService
  ) {}

  async execute(productData: CreateProductWithVariantsDTO): Promise<Product> {
    logger.info('creating product with variants', productData)

    return Database.transaction(async (trx) => {
      try {
        const createdProduct = await this.createProductService.execute({
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          categoryIds: productData.categoryIds,
        })

        const variantsToCreate: Array<CreateVariantDTO> = productData.variants?.length
          ? productData.variants
          : [this.createDefaultVariant(productData)]

        const variantPriceJson = await this.currencyConverterService.handle(
          'EUR',
          variantsToCreate.map((v: CreateVariantDTO) => v.price)
        )

        const createdVariants = await Promise.all(
          variantsToCreate.map((variant) => {
            const command = new CreateVariantCommand(
              variant.name,
              variant.sku,
              variant.options,
              variant.price,
              variant.stockQuantity,
              variant.currency,
              variantPriceJson,
              variant.isDefault
            )
            return this.createVariantService.execute(command, createdProduct.id)
          })
        )

        logger.info('successfully created product with variants', {
          productId: createdProduct.id,
          variantCount: createdVariants.length,
        })

        return {
          ...createdProduct,
          variants: createdVariants,
        } as Product
      } catch (error) {
        logger.error('failed to create product with variants', { error, productData })
        throw error
      }
    })
  }

  private createDefaultVariant(productData: CreateProductWithVariantsDTO): CreateVariantDTO {
    const slug = productData.slug || productData.name.toLowerCase().replace(/\s+/g, '-')

    return {
      sku: `${slug}-default`,
      name: 'Default',
      options: {},
      price: productData.defaultPrice || 1,
      stockQuantity: 0,
      currency: 'EUR' as const,
      pricesJson: {},
      isDefault: true,
    }
  }
}
