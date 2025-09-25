import { PaginatedResponse, PaginationParams } from '@mindboard/shared'

export abstract class BaseQueryBuilder<TResult, TFilter, TSortOption> {
  protected filters: Partial<TFilter> = {}
  protected sortOptions?: TSortOption
  protected pagination?: PaginationParams
  protected relations: Array<string> = []

  applyFilter(filters: Partial<TFilter>): this {
    this.filters = { ...this.filters, ...filters }

    return this
  }

  applySorting(sortOptions: TSortOption): this {
    this.sortOptions = sortOptions

    return this
  }

  applyPagination({ page, limit, offset }: PaginationParams): this {
    this.pagination = {
      page,
      limit,
      offset: offset ? offset : (page - 1) * limit,
    }

    return this
  }

  with(relations: Array<string>): this {
    this.relations = [...this.relations, ...relations]
    return this
  }

  abstract execute(): Promise<PaginatedResponse<TResult>>
  abstract first(): Promise<TResult | null>
  abstract count(): Promise<number>
}
