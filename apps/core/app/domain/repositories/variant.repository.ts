import { inject } from '@adonisjs/core'
import { ProductVariant } from '@mindboard/shared'
import VariantEntity from '#entities/variant.entity'

@inject()
export abstract class VariantRepository {
  abstract create(variant: VariantEntity): Promise<ProductVariant>
}
