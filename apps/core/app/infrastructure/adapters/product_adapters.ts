import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import CreateProductService from '#application/create_product_service'

@inject()
export default class ProductsAdapters {
  constructor(protected createProduct: CreateProductService) {}

  async handleCreate(ctx: HttpContext) {
    let createProductDTO = ctx.request.body
    await this.createProduct.execute(createProductDTO)

    ctx.response.send(createProductDTO)
  }
}
