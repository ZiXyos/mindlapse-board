import { inject } from '@adonisjs/core'
import Database from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'

import UpdateProduct from '#services/update.product'
import UpdateVariant from '#services/update.variant'
import { DeleteProductCommand, UpdateProductCommand } from '#commands/product.commands'
import ProductModel from '#models/product.model'
import ProductEntity from '#entities/product.entity'
import { UpdateVariantCommand } from '#commands/variant.commands'

import { Identifer } from '@mindboard/shared'

@inject()
export default class DeleteProductService {
  constructor(
    protected updateProductService: UpdateProduct,
    protected updateVariantService: UpdateVariant
  ) {}

  async execute(command: DeleteProductCommand): Promise<Record<string, string>> {
    return Database.transaction(async (tx) => {
      try {
        const existingProduct = await ProductModel.query({ client: tx })
          .where('id', command.id)
          .preload('variants')
          .firstOrFail()

        const productEntity = ProductEntity.from(existingProduct)
        const existingProductVariants = existingProduct.variants
        const variantsIDs = existingProductVariants.map((variant) => variant.id)
        const updateVariantCommands = this.createUpdateVariantCommand(variantsIDs)

        await Promise.all(
          updateVariantCommands.map(async (cmd) => {
            const existingVariant = existingProductVariants.find((v) => v.id === cmd.id)
            if (!existingVariant) {
              throw new Error(`Variant ${cmd.id} not found`)
            }

            const updatedVariant = this.updateVariantService.execute(cmd)
            existingVariant.merge(updatedVariant)
            await existingVariant.save()
          })
        )

        let updatedProduct = existingProduct
        const updatedProductEntity = this.updateProductService.execute(
          this.createUpdateProductCommand(command),
          productEntity
        )
        updatedProduct.merge(updatedProductEntity.toModel())
        await updatedProduct.save()
        logger.info(`product ${updatedProduct.id} deleted`)

        return {
          id: updatedProduct.id,
        }
      } catch (e) {
        logger.error(e)
        throw e
      }
    })
  }

  private createUpdateVariantCommand(ids: Array<Identifer>): Array<UpdateVariantCommand> {
    return ids.map(
      (id) =>
        new UpdateVariantCommand(
          id,
          undefined,
          undefined,
          undefined,
          undefined,
          0,
          undefined,
          undefined,
          undefined,
          undefined
        )
    )
  }

  private createUpdateProductCommand(command: DeleteProductCommand): UpdateProductCommand {
    return new UpdateProductCommand({
      id: command.id,
      isActive: false,
    })
  }
}
