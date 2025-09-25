import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { domain, PaginatedResponse, ProductWithVariantsAndCategories } from '@mindboard/shared'

import { ProductQueryBuilder } from '#queries/product.queries.builder'
import ProductModel from '#models/product.model'
import ProductVariantModel from '#models/variant.model'

type QueryType = ModelQueryBuilderContract<typeof ProductModel>
type VariantQueryType = ModelQueryBuilderContract<typeof ProductVariantModel>

export class LucidProductQueryBuilder extends ProductQueryBuilder {
  private query: QueryType
  constructor() {
    super()
    this.query = ProductModel.query()
  }

  private pipe = <T>(value: T, ...funcs: Array<(arg: T) => T>): T => {
    return funcs.reduce((acc, func) => func(acc), value)
  }

  private applyWhen = <T>(
    cond: T | null | undefined,
    filterFunc: (arg: T) => (query: QueryType) => QueryType
  ) => {
    return (query: QueryType): QueryType => {
      return cond ? filterFunc(cond)(query) : query
    }
  }

  private filterByName =
    (name: string) =>
    (query: QueryType): QueryType => {
      return query.where('name', 'ILIKE', `%${name}%`)
    }

  private filterBySlug =
    (slug: string) =>
    (query: QueryType): QueryType => {
      return query.where('slug', 'ILIKE', `%${slug}%`)
    }

  private filterByStatus =
    (isActive: boolean) =>
    (query: QueryType): QueryType => {
      return query.where('is_active', isActive)
    }

  private filterByPriceRange =
    (minPrice?: number, maxPrice?: number) =>
    (query: QueryType): QueryType => {
      return query.whereHas('variants', (variantQuery: VariantQueryType) => {
        if (minPrice) variantQuery.where('price', '>=', minPrice)
        if (maxPrice) variantQuery.where('price', '<=', maxPrice)
      })
    }

  private filterByCategories =
    (categoryIDs: Array<string>) =>
    (query: QueryType): QueryType => {
      return query.whereHas('categories', (categoryQuery) => {
        categoryQuery.whereIn('id', categoryIDs)
      })
    }

  private filterByStock =
    (inStock: boolean) =>
    (query: QueryType): QueryType => {
      if (inStock) {
        return query.whereHas('variants', (variantQuery: VariantQueryType) => {
          variantQuery.where('stock_quantity', '>', 0)
        })
      }
      return query
    }

  applyFilter(filters: Partial<domain.ProductFilters>): this {
    super.applyFilter(filters)
    this.query = this.pipe(
      this.query,
      this.applyWhen(filters.name, this.filterByName),
      this.applyWhen(filters.slug, this.filterBySlug),
      this.applyWhen(filters.isActive !== undefined, () => this.filterByStatus(filters.isActive!)),
      this.applyWhen(filters.minPrice || filters.maxPrice, () =>
        this.filterByPriceRange(filters.minPrice, filters.maxPrice)
      ),
      this.applyWhen(filters.categoryIDs, this.filterByCategories),
      this.applyWhen(filters.inStock !== undefined, () => this.filterByStock(filters.inStock!))
    )

    return this
  }

  async execute(): Promise<PaginatedResponse<ProductWithVariantsAndCategories>> {
    let queryBuilder = this.query.clone()

    const total = await this.query
      .clone()
      .count('* as total')
      .then((result) => result[0].$extras.total)

    if (this.relations.length > 0) {
      if (this.relations.includes('variants')) {
        queryBuilder = queryBuilder.preload('variants')
      }
      if (this.relations.includes('categories')) {
        queryBuilder = queryBuilder.preload('categories')
      }
    }

    if (this.sortOptions) {
      const { field, direction } = this.sortOptions
      const dbField =
        field === 'createdAt' ? 'created_at' : field === 'updatedAt' ? 'updated_at' : field
      queryBuilder = queryBuilder.orderBy(dbField, direction)
    } else {
      queryBuilder = queryBuilder.orderBy('created_at', 'desc')
    }

    if (this.pagination) {
      queryBuilder = queryBuilder.offset(this.pagination.offset).limit(this.pagination.limit)
    }

    const data = await queryBuilder.exec()

    return {
      data: data.map((product) => this.mapToDoMainType(product)),
      pagination: {
        page: this.pagination?.page ?? 1,
        limit: this.pagination?.limit ?? 10,
        total,
        totalPages: Math.ceil(total / (this.pagination?.limit ?? 10)),
      },
    }
  }

  async first(): Promise<ProductWithVariantsAndCategories | null> {
    let queryBuilder = this.query.clone()

    if (this.relations.length > 0) {
      if (this.relations.includes('variants')) {
        queryBuilder = queryBuilder.preload('variants')
      }
      if (this.relations.includes('categories')) {
        queryBuilder = queryBuilder.preload('categories')
      }
    }

    const result = await queryBuilder.first()
    return result ? this.mapToDoMainType(result) : null
  }

  async count(): Promise<number> {
    const result = await this.query.clone().count('* as total')
    return result[0].$extras.total
  }

  private mapToDoMainType(product: any): ProductWithVariantsAndCategories {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      isActive: product.isActive,
      createdAt: product.createdAt?.toISO(),
      updatedAt: product.updatedAt?.toISO(),
      variants:
        product.variants?.map((variant: any) => ({
          id: variant.id,
          sku: variant.sku,
          price: variant.price,
          stockQuantity: variant.stockQuantity,
        })) || [],
      categories:
        product.categories?.map((category: any) => ({
          id: category.id,
          name: category.name,
        })) || [],
    }
  }
}
