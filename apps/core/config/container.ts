import { ProductRepository } from '#repositories/product.repository'
import { VariantRepository } from '#repositories/variant.repository'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    ProductRepository: ProductRepository
    VariantRepository: VariantRepository
  }
}
