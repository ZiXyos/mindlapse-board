import type { ApplicationService } from '@adonisjs/core/types'

import '#config/container'
import { LucidProductRepository } from '#lucidRepositories/lucid.product.repository'
import { ProductRepository } from '#repositories/product.repository'
import { VariantRepository } from '#repositories/variant.repository'
import { LucidVariantRepository } from '#lucidRepositories/lucid.variant.repository'

export default class ApplicationProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton(ProductRepository, () => {
      return this.app.container.make(LucidProductRepository)
    })

    this.app.container.singleton(VariantRepository, () => {
      return this.app.container.make(LucidVariantRepository)
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
