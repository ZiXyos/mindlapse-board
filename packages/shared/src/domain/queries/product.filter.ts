import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

export const productFilterObject = vine.object({
    name: vine.string().minLength(3).optional(),
    slug: vine.string().minLength(3).optional(),
    isActive: vine.boolean().optional(),
    categoryIDs: vine.array(vine.string()).optional(),
    minPrice: vine.number().optional(),
    maxPrice: vine.number().optional(),
    inStock: vine.boolean().optional(),
})

export const productFilterSchema =  vine.compile(productFilterObject)

export type ProductFilters = Infer<typeof productFilterSchema>
