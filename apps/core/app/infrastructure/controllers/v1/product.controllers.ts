import ProductsAdapters from '#adapters/product.adapters'
import { inject } from '@adonisjs/core'
import { HTTPStatusCreated, HTTPStatusServerError } from '@mindboard/shared'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductControllers {
  constructor(protected productAdapter: ProductsAdapters) {}

  public async getProducts(ctx: HttpContext) {
    const res = await this.productAdapter.handleGet(ctx)
    ctx.response.send({ data: res.data })
  }

  public async getProductByID(ctx: HttpContext) {
    const { id } = ctx.params
    if (typeof id !== 'string') return

    const res = await this.productAdapter.handleGetByID(id)
    ctx.response.send({ data: res })
  }

  public async createProduct(ctx: HttpContext) {
    const res = await this.productAdapter.handleCreate(ctx)

    if (res.success) ctx.response.status(HTTPStatusCreated).send({ data: res.data })
    else ctx.response.status(HTTPStatusServerError).send(res.message)
  }
}
