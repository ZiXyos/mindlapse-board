import logger from '@adonisjs/core/services/logger'
import { UpdateVariantCommand } from '#commands/variant.commands'
import ProductVariantModel from '#models/variant.model'
import { inject } from '@adonisjs/core'

@inject()
export default class UpdateVariant {
  execute(command: UpdateVariantCommand): Partial<ProductVariantModel> {
    logger.info('updating variant', { variantId: command.id })

    const updatableFields: Array<keyof Omit<UpdateVariantCommand, 'id'>> = [
      'name',
      'sku',
      'options',
      'price',
      'stockQuantity',
      'currency',
      'pricesJson',
      'isDefault',
      'position',
    ]

    const updateData: Partial<ProductVariantModel> = {}

    updatableFields.forEach((field) => {
      const value = command[field]
      if (value !== undefined) {
        updateData[field] = value
      }
    })

    return updateData
  }
}
