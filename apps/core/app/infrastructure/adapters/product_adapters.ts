import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import CreateProductService from '#application/create_product_service'
import logger from '@adonisjs/core/services/logger'

import {
  createProductSchema,
  validateData,
  type CreateProductPayload,
  type ApiResponse,
  type Product,
} from '@mindboard/shared'

@inject()
export default class ProductsAdapters {
  constructor(protected createProduct: CreateProductService) {}

  async handleCreate(ctx: HttpContext): Promise<void> {
    const { request, response } = ctx

    try {
      const validationResult = await validateData<CreateProductPayload>(
        createProductSchema,
        request.body()
      )

      if (!validationResult.success) {
        const errorResponse: ApiResponse = {
          success: false,
          message: 'Validation failed',
          errors: validationResult.errors,
        }
        response.status(422).send(errorResponse)
        return
      }

      const product = await this.createProduct.execute(validationResult.data)

      const successResponse: ApiResponse<Product> = {
        success: true,
        data: product as Product,
        message: 'Product created successfully',
      }

      response.status(201).send(successResponse)
    } catch (error) {
      logger.error('Error creating product:', error)

      const errorResponse: ApiResponse = {
        success: false,
        message: 'Internal server error',
      }

      response.status(500).send(errorResponse)
    }
  }
}
