import { productSchema } from '../validator'
import type { Infer } from "@vinejs/vine/types";

export type CreateProductDTO = Infer<typeof productSchema>