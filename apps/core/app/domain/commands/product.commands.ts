export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly description?: string,
    public readonly category?: Array<string>
  ) {}
}

type UpdateProductCommandParams = {
  id: string
  name?: string
  slug?: string
  description?: string
  isActive?: boolean
  categoryIds?: string[]
}
export class UpdateProductCommand {
  constructor(public readonly params: UpdateProductCommandParams) {}
}

export class DeleteProductCommand {
  constructor(public readonly id: string) {}
}
