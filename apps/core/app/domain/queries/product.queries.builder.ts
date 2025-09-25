import {
  domain,
  PaginatedResponse,
  PaginationParams,
  ProductListItem,
  ProductWithVariantsAndCategories,
} from '@mindboard/shared'

import { BaseQueryBuilder } from '#queries/base.query.builder'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IProductQueryBuilder {
  withVariants(): this
  withCategories(): this
  applyFilter(filters: domain.ProductFilters): this
  applySorting(options: domain.ProductSortOpts): this
  applyPagination({ page, limit, offset }: PaginationParams): this
  execute(): Promise<PaginatedResponse<ProductWithVariantsAndCategories>>
  first(): Promise<ProductWithVariantsAndCategories | null>
  count(): Promise<number>
}

export abstract class ProductQueryBuilder
  extends BaseQueryBuilder<ProductListItem, domain.ProductFilters, domain.ProductSortOpts>
  implements IProductQueryBuilder
{
  withVariants(): this {
    return this.with(['variants'])
  }

  withCategories(): this {
    return this.with(['categories'])
  }
}
