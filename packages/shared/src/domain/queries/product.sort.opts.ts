import vine from "@vinejs/vine";
import {Infer} from "@vinejs/vine/types";

export const productSortObject = vine.object({
    field: vine.enum(['name', 'createdAt', 'updatedAt', 'price']),
    direction: vine.enum(['asc', 'desc'])
})

export const productSortOptionsSchema = vine.compile(productSortObject)

export type ProductSortOpts = Infer<typeof productSortOptionsSchema>