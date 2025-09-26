import { HTTPClient } from "../http-client";
import { productsRoutes } from '../api-routes'
import type {
  ProductListItem,
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  ProductWithVariantsAndCategories,
  UpdateProductWithVariantsDTO,
} from '@mindboard/shared'
import type { RequestOptions } from "../interfaces";

export class ProductRes {
  constructor(private readonly client: HTTPClient) {}

  public async getProducts(options?: Partial<RequestOptions>) {
    return await this.client.req<{ data: ProductListItem[] }>(
      productsRoutes.base.method,
      productsRoutes.base.path,
      options
    )
  }

  public async getProduct(id: string) {
    const path = productsRoutes.byID.createPath({ id })
    return await this.client.req<{ data: ProductWithVariantsAndCategories }>(
      productsRoutes.byID.method,
      path
    )
  }

  public async createProduct(payload: CreateProductPayload) {
    return await this.client.req<{ data: Product }>(
      productsRoutes.create.method,
      productsRoutes.create.path,
      { body: payload }
    )
  }

  public async updateProduct(id: string, payload: UpdateProductWithVariantsDTO) {
    const path = productsRoutes.update.createPath({ id })
    return await this.client.req<{ data: Product }>(
      productsRoutes.update.method,
      path,
      { body: payload }
    )
  }

  public async replaceProduct(id: string, payload: UpdateProductWithVariantsDTO) {
    const path = productsRoutes.replace.createPath({ id })
    return await this.client.req<{ data: Product }>(
      productsRoutes.replace.method,
      path,
      { body: payload }
    )
  }

  public async deleteProduct(id: string) {
    const path = productsRoutes.delete.createPath({ id })
    return await this.client.req<{ data: { message: string } }>(
      productsRoutes.delete.method,
      path
    )
  }

  public async queryProducts(queryPayload: any, options?: Partial<RequestOptions>) {
    return await this.client.req<{ data: ProductListItem[] }>(
      productsRoutes.query.method,
      productsRoutes.query.path,
      {
        body: queryPayload,
        ...options
      }
    )
  }
}
