import ProductEntity from '#entities/product_entity'

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>
}
