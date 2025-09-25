import type { Currency, Price } from '@mindboard/shared'

// TODO: EXTRACT THE PARAMS TYPE IS SO BORING

export class CreateVariantCommand {
  constructor(
    public readonly name: string,
    public readonly sku: string,
    public readonly option: Record<string, string>,
    public readonly price: Price,
    public readonly stockQuantity: number,
    public readonly currency: Currency,
    public readonly pricesJson: Record<Currency, number>,
    public readonly isDefault: boolean
  ) {}
}

export class UpdateVariantCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly sku?: string,
    public readonly options?: Record<string, string>,
    public readonly price?: Price,
    public readonly stockQuantity?: number,
    public readonly currency?: Currency,
    public readonly pricesJson?: Record<Currency, number>,
    public readonly isDefault?: boolean,
    public readonly position?: number
  ) {}
}

export class UpdateProductWithVariantsCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly slug?: string,
    public readonly description?: string,
    public readonly isActive?: boolean,
    public readonly categoryIds?: string[],
    public readonly variants?: UpdateVariantCommand[]
  ) {}
}
