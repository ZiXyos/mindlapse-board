import ProductModel from '#models/product.model'

type UpdateProductFields = {
  name?: string
  slug?: string
  description?: string
  isActive?: boolean
}

export default class ProductEntity {
  private constructor(
    private readonly _id: string,
    private _name: string,
    private _slug: string,
    private _description: string,
    private _isActive: boolean
  ) {}

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get slug() {
    return this._slug
  }

  get description() {
    return this._description
  }

  get isActive() {
    return this._isActive
  }

  static create(
    id?: string,
    name?: string,
    slug?: string,
    description?: string,
    isActive?: boolean
  ): ProductEntity {
    return new ProductEntity(
      id || 'id-001',
      name || 'simple-product',
      slug || 'simple-product',
      description || 'Default description',
      isActive ?? true
    )
  }

  update(fields: UpdateProductFields) {
    if (fields.name !== undefined) this._name = fields.name
    if (fields.slug !== undefined) this._slug = fields.slug
    if (fields.description !== undefined) this._description = fields.description
    if (fields.isActive !== undefined) this._isActive = fields.isActive
  }

  setActive(isActive: boolean) {
    this._isActive = isActive
  }

  toModel(): Partial<ProductModel> {
    return {
      id: this._id,
      name: this._name,
      slug: this._slug,
      description: this._description,
      isActive: this._isActive,
    }
  }

  static from(product: ProductModel) {
    return new ProductEntity(
      product.id,
      product.name,
      product.slug,
      product.description || '',
      product.isActive
    )
  }
}
