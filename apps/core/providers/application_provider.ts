import type { ApplicationService } from '@adonisjs/core/types'
import { LucidProductRepository } from '#lucidRepositories/lucid_product_repository'
import '#config/container'
import { ProductRepository } from '#repositories/product_repository'

export default class ApplicationProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton(ProductRepository, () => {
      return this.app.container.make(LucidProductRepository)
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
