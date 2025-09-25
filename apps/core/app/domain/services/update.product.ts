import logger from '@adonisjs/core/services/logger'
import { UpdateProductCommand } from '#commands/product.commands'
import ProductEntity from '#entities/product.entity'
import { inject } from '@adonisjs/core'

@inject()
export default class UpdateProduct {
  execute(productCommand: UpdateProductCommand, existingProduct: ProductEntity): ProductEntity {
    const command = productCommand.params || {}
    logger.info('updating product', { productId: command.id })

    // to mes should clone it before edit idk.
    existingProduct.update({
      name: command.name,
      slug: command.slug,
      description: command.description,
      isActive: command.isActive,
    })

    return existingProduct
  }
}
