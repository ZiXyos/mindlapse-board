import VariantEntity from '#entities/variant.entity'
import { ProductVariant as ProductVariantType } from '@mindboard/shared'
import ProductVariantModel from '#models/variant.model'
import { VariantRepository } from '#repositories/variant.repository'
import { inject } from '@adonisjs/core'

@inject()
export class LucidVariantRepository implements VariantRepository {
  async create(variant: VariantEntity): Promise<ProductVariantType> {
    const productVariant = await ProductVariantModel.create(variant.toModel())
    const createdProductVariantEntity = VariantEntity.from(productVariant).toProductVariant()

    return {
      ...createdProductVariantEntity,
      createdAt: productVariant.createdAt.toISO(),
      updatedAt: productVariant.updatedAt?.toISO() || null,
    } satisfies ProductVariantType
  }
}
