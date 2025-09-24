import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

import {
  createProductWithVariantsSchema,
  validateData,
  type CreateProductWithVariantsDTO,
  type ApiResponse,
  type Product,
  HTTPStatusCreated,
  HTTPStatusServerError,
  HTTPStatusUnprocessableEntity,
} from '@mindboard/shared'

import CreateProductWithVariantsService from '#application/create.product.with.variants.service'

@inject()
export default class ProductsAdapters {
  constructor(protected createProductWithVariants: CreateProductWithVariantsService) {}

  async handleCreate(ctx: HttpContext): Promise<ApiResponse> {
    const { request } = ctx

    try {
      const validationResult = await validateData<CreateProductWithVariantsDTO>(
        createProductWithVariantsSchema,
        request.body()
      )

      if (!validationResult.success) {
        logger.warn('validation failed: ', validationResult.errors)
        return {
          success: false,
          code: HTTPStatusUnprocessableEntity,
          message: 'Validation failed',
          errors: validationResult.errors,
        }
      }

      const product = await this.createProductWithVariants.execute(validationResult.data)

      return {
        success: true,
        code: HTTPStatusCreated,
        data: product,
        message: 'Product created successfully',
      }
    } catch (error) {
      logger.error(error)
      logger.error('Error creating product:', error)

      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }

  async handleGet(ctx: HttpContext): Promise<ApiResponse> {
    const { request } = ctx

    return {
      success: true,
      data: { products: [] },
    }
  }
}
