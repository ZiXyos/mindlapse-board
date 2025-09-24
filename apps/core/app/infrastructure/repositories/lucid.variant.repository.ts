import VariantEntity from '#entities/variant.entity'
import { ProductVariant as ProductVariantType } from '@mindboard/shared'
import ProductVariant from '#models/variant.model'
import { VariantRepository } from '#repositories/variant.repository'
import { inject } from '@adonisjs/core'

@inject()
export class LucidVariantRepository implements VariantRepository {
  async create(variant: VariantEntity): Promise<ProductVariantType> {
    const productVariant = await ProductVariant.create(variant.toModel())

    return productVariant as ProductVariantType
  }
}
