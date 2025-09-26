import {Price as PriceType} from "../types/price";

export const Price = (cents: number): PriceType => (cents/100) as PriceType