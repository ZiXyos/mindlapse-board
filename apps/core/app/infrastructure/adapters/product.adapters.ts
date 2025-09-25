import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

import {
  createProductWithVariantsSchema,
  validateData,
  type CreateProductWithVariantsDTO,
  type ApiResponse,
  HTTPStatusCreated,
  HTTPStatusServerError,
  HTTPStatusUnprocessableEntity,
  type ProductQueryRequest,
  domain,
} from '@mindboard/shared'

import CreateProductWithVariantsService from '#application/create.product.with.variants.service'
import ProductService from '#application/product.service'

@inject()
export default class ProductsAdapters {
  constructor(
    protected createProductWithVariants: CreateProductWithVariantsService,
    protected productService: ProductService
  ) {}

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
      logger.error('error creating product', error)
      logger.error(error)

      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }

  async handleGet(ctx: HttpContext): Promise<ApiResponse> {
    try {
      const res = await this.productService.getProducts()
      return {
        success: true,
        code: 200,
        data: { products: res },
      }
    } catch (err) {
      logger.error('error fetching all product', err)
      logger.error(err)
      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }

  async handleGetByID(id: string): Promise<ApiResponse> {
    try {
      const res = await this.productService.getProductById(id)
      return {
        success: true,
        code: 200,
        data: res,
      }
    } catch (err) {
      logger.error(`error fetching product id: ${id}`, err)
      logger.error(err)

      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }

  async handleQuery(ctx: HttpContext): Promise<ApiResponse> {
    const { request } = ctx

    try {
      const validationResult = await validateData<ProductQueryRequest>(
        domain.productQuerySchema,
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

      const result = await this.productService.queryProducts(validationResult.data)

      return {
        success: true,
        code: 200,
        data: result,
        message: 'Products queried successfully',
      }
    } catch (error) {
      console.error('error fetching product', error)
      logger.error('error querying products', error)

      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }
}
