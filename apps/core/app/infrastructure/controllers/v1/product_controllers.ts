import ProductsAdapters from '#adapters/product_adapters'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductControllers {
  constructor(protected productAdapter: ProductsAdapters) {}

  public getProducts(ctx: HttpContext) {
    ctx.response.send({ message: 'Getting product from products' })
  }

  public createProduct(ctx: HttpContext) {
    this.productAdapter.handleCreate(ctx)
  }
}
