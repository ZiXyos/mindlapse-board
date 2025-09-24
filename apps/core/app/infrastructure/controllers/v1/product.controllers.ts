import ProductsAdapters from '#adapters/product.adapters'
import { inject } from '@adonisjs/core'
import { HTTPStatusCreated, HTTPStatusServerError } from '@mindboard/shared'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductControllers {
  constructor(protected productAdapter: ProductsAdapters) {}

  public getProducts(ctx: HttpContext) {
    ctx.response.send({ message: 'Getting product from products' })
  }

  public async createProduct(ctx: HttpContext) {
    const res = await this.productAdapter.handleCreate(ctx)

    if (res.success) ctx.response.status(HTTPStatusCreated).send(res.data)
    else ctx.response.status(HTTPStatusServerError).send(res.message)
  }
}
