import logger from '@adonisjs/core/services/logger'
import { UpdateProductWithVariantsCommand } from '#commands/variant.commands'
import ProductModel from '#models/product.model'

export default class ProductActivation {
  shouldProductBeActive(variants: Array<{ stockQuantity: number }>): boolean {
    if (!variants || variants.length === 0) {
      return true
    }

    return variants.some((variant) => variant.stockQuantity > 0)
  }

  isManualDeactivation(command: UpdateProductWithVariantsCommand): boolean {
    return command.isActive === false
  }

  async execute(
    product: ProductModel,
    command: UpdateProductWithVariantsCommand
  ): Promise<{ wasDeactivated: boolean; wasReactivated: boolean }> {
    const shouldBeActive = this.shouldProductBeActive(product.variants)
    const isManualDeactivation = this.isManualDeactivation(command)

    let wasDeactivated = false
    let wasReactivated = false

    if (!shouldBeActive && product.isActive) {
      logger.info(
        `Domain rule: Auto-deactivating product ${product.id} due to zero stock in all variants`
      )
      product.isActive = false
      wasDeactivated = true
    }

    if (shouldBeActive && !product.isActive && !isManualDeactivation) {
      logger.info(
        `Domain rule: Auto-reactivating product ${product.id} due to stock being added to variants`
      )
      product.isActive = true
      wasReactivated = true
    }

    return { wasDeactivated, wasReactivated }
  }
}
