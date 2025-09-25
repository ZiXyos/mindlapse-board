import { ProductRepository } from '#repositories/product.repository'
import {
  Product,
  type ProductQueryRequest,
  PaginatedResponse,
  ProductWithVariantsAndCategories,
} from '@mindboard/shared'
import { inject } from '@adonisjs/core'

@inject()
export default class ProductService {
  constructor(protected productRepository: ProductRepository) {}

  async getProducts(): Promise<Array<Product>> {
    return this.productRepository.getAll()
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.getById(id)
  }

  async queryProducts(
    queryRequest: ProductQueryRequest
  ): Promise<PaginatedResponse<ProductWithVariantsAndCategories>> {
    const queryBuilder = this.productRepository.query().withVariants().withCategories()

    if (queryRequest.filters) {
      queryBuilder.applyFilter(queryRequest.filters)
    }

    if (queryRequest.sort) {
      queryBuilder.applySorting(queryRequest.sort)
    }

    if (queryRequest.page || queryRequest.limit) {
      const page = queryRequest.page || 1
      const limit = queryRequest.limit || 10
      const offset = (page - 1) * limit

      queryBuilder.applyPagination({ page, limit, offset })
    }

    return queryBuilder.execute()
  }
}
