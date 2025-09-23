import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import CreateProductService from '#application/create_product_service'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class ProductsAdapters {
  constructor(protected createProduct: CreateProductService) {}

  async handleCreate(ctx: HttpContext) {
    let { request, response } = ctx
    let res = await this.createProduct.execute(request.body)

    response.send({ data: res })
  }
}
