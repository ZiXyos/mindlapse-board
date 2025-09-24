import logger from '@adonisjs/core/services/logger'
import { randomUUID } from 'node:crypto'

import { CreateProductCommand } from '#commands/product.commands'
import ProductEntity from '#entities/product.entity'

export default class CreateProduct {
  execute(command: CreateProductCommand): ProductEntity {
    logger.info('create product', command)

    const id = randomUUID()

    return ProductEntity.create(id, command.name, command.slug)
  }
}
