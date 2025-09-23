import { ProductRepository } from '#repositories/product_repository.js'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    ProductRepository: ProductRepository
  }
}
