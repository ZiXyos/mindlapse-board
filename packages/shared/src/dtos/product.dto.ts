import { productSchema, updateProductSchema } from "../validator"
import { updateProductWithVariantsSchema } from "../validator/variant.validator"
import type { Infer } from "@vinejs/vine/types";

export type CreateProductDTO = Infer<typeof productSchema>
export type UpdateProductDTO = Infer<typeof updateProductSchema>
export type UpdateProductWithVariantsDTO = Infer<typeof updateProductWithVariantsSchema>
