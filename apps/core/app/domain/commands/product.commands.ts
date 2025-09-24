export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly description?: string,
    public readonly category?: Array<string>
  ) {}
}
