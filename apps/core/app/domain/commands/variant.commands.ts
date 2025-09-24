import { Currency } from '#models/variant.model'

export class CreateVariantCommand {
  constructor(
    public readonly name: string,
    public readonly sku: string,
    public readonly option: Record<string, string>,
    public readonly price: number,
    public readonly stockQuantity: number,
    public readonly currency: Currency,
    public readonly pricesJson: Record<Currency, number>,
    public readonly isDefault: boolean
  ) {}
}
