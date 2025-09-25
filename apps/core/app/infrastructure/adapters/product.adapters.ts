import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

import {
  createProductWithVariantsSchema,
  updateProductWithVariantsSchema,
  validateData,
  type CreateProductWithVariantsDTO,
  type UpdateProductWithVariantsDTO,
  type ApiResponse,
  HTTPStatusCreated,
  HTTPStatusOK,
  HTTPStatusNotFound,
  HTTPStatusServerError,
  HTTPStatusUnprocessableEntity,
  type ProductQueryRequest,
  domain,
} from '@mindboard/shared'

import CreateProductWithVariantsService from '#application/create.product.with.variants.service'
import ProductService from '#application/product.service'
import UpdateProductWithVariantsService from '#application/update.product.with.variants.service'
import { UpdateProductWithVariantsCommand, UpdateVariantCommand } from '#commands/variant.commands'
import { DeleteProductCommand } from "#commands/product.commands";
import DeleteProductService from "#application/delete.product.service";

@inject()
export default class ProductsAdapters {
  constructor(
    protected createProductWithVariants: CreateProductWithVariantsService,
    protected productService: ProductService,
    protected updateProductWithVariants: UpdateProductWithVariantsService,
    protected deleteProductService: DeleteProductService,
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

  async handleUpdate(ctx: HttpContext, id: string): Promise<ApiResponse> {
    const { request } = ctx

    try {
      const validationResult = await validateData<UpdateProductWithVariantsDTO>(
        updateProductWithVariantsSchema,
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

      const variantCommands = validationResult.data.variants?.map(
        (variant: any) =>
          new UpdateVariantCommand(
            variant.id,
            variant.name,
            variant.sku,
            variant.options,
            variant.price,
            variant.stockQuantity,
            variant.currency,
            variant.pricesJson,
            variant.isDefault,
            variant.position
          )
      )

      const command = new UpdateProductWithVariantsCommand(
        id,
        validationResult.data.name,
        validationResult.data.slug,
        validationResult.data.description,
        validationResult.data.isActive,
        validationResult.data.categoryIds,
        variantCommands
      )

      const updatedProduct = await this.updateProductWithVariants.execute(command)

      return {
        success: true,
        code: HTTPStatusOK,
        data: updatedProduct,
        message: 'Product updated successfully',
      }
    } catch (error: any) {
      logger.error(`Error updating product ${id}:`, error)

      if (error.message === 'Product not found') {
        return {
          success: false,
          code: HTTPStatusNotFound,
          message: 'Product not found',
        }
      }

      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }

  async handleReplace(ctx: HttpContext, id: string): Promise<ApiResponse> {
    const { request } = ctx

    try {
      const validationResult = await validateData<UpdateProductWithVariantsDTO>(
        updateProductWithVariantsSchema,
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

      const variantCommands = validationResult.data.variants?.map(
        (variant: any) =>
          new UpdateVariantCommand(
            variant.id,
            variant.name,
            variant.sku,
            variant.options,
            variant.price,
            variant.stockQuantity,
            variant.currency,
            variant.pricesJson,
            variant.isDefault,
            variant.position
          )
      )

      const command = new UpdateProductWithVariantsCommand(
        id,
        validationResult.data.name,
        validationResult.data.slug,
        validationResult.data.description,
        validationResult.data.isActive,
        validationResult.data.categoryIds,
        variantCommands
      )

      const replacedProduct = await this.updateProductWithVariants.execute(command)

      return {
        success: true,
        code: HTTPStatusOK,
        data: replacedProduct,
        message: 'Product replaced successfully',
      }
    } catch (error: any) {
      logger.error(`Error replacing product ${id}:`, error)

      if (error.message === 'Product not found') {
        return {
          success: false,
          code: HTTPStatusNotFound,
          message: 'Product not found',
        }
      }

      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }

  async deleteProduct(id: string): Promise<ApiResponse> {
    try {
      const command = new DeleteProductCommand(id)
      const deletedProduct = await this.deleteProductService.execute(command)
      return {
        success: true,
        data: deletedProduct,
        code: HTTPStatusOK,
        message: 'Product deleted successfully',
      }
    } catch (err) {
      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'Internal server error',
      }
    }
  }
}
