import logger from '@adonisjs/core/services/logger'
import { randomUUID } from 'node:crypto'

import { CreateVariantCommand } from '#commands/variant.commands'
import VariantEntity from '#entities/variant.entity'

export default class CreateVariant {
  execute(command: CreateVariantCommand, productId: string): VariantEntity {
    logger.info('create variant', { command, productId })

    const id = randomUUID()

    return VariantEntity.create(
      productId,
      command.name,
      command.sku,
      command.option,
      command.price,
      command.stockQuantity,
      command.currency,
      command.pricesJson,
      command.isDefault,
      undefined,
      id
    )
  }
}
