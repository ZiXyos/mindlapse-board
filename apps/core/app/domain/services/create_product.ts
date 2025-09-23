import logger from '@adonisjs/core/services/logger'

import { CreateProductCommand } from '#commands/product_commands'

export default class CreateProduct {
  // create the entity given the command
  execute(command: CreateProductCommand): any /* domain type */ {
    logger.info('create product', command)
    return {
      id: 1,
      name: 'createProduct',
    }
  }
}
