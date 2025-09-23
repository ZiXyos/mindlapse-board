import logger from '@adonisjs/core/services/logger'

import { CreateProductCommand } from '#commands/product_commands'

export default class CreateProduct {
  execute(command: CreateProductCommand): any /* domain type */ {
    logger.info('create product', command)
    return {}
  }
}
