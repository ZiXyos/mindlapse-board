import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'

import CreateVariant from '#services/create.variant'
import { CreateVariantCommand } from '#commands/variant.commands'
import { VariantRepository } from '#repositories/variant.repository'

import { ProductVariant } from '@mindboard/shared'

@inject()
export default class CreateVariantService {
  constructor(
    protected createVariant: CreateVariant,
    protected variantRepository: VariantRepository,
  ) {}

  async execute(command: CreateVariantCommand, productId: string): Promise<ProductVariant> {
    logger.info('creating variant for product', { productId, variantData: command })

    const variantEntity = this.createVariant.execute(command, productId)
    return await this.variantRepository.create(variantEntity)
  }
}
