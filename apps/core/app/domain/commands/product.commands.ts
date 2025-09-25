export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly description?: string,
    public readonly category?: Array<string>
  ) {}
}

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly slug?: string,
    public readonly description?: string,
    public readonly isActive?: boolean,
    public readonly categoryIds?: string[]
  ) {}


}
