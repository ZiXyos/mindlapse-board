import type { Infer } from "@vinejs/vine/types";
import { createVariantSchema, updateVariantSchema, createProductWithVariantsSchema } from '../validator';

export type CreateVariantDTO = Infer<typeof createVariantSchema>;
export type UpdateVariantDTO = Infer<typeof updateVariantSchema>;
export type CreateProductWithVariantsDTO = Infer<typeof createProductWithVariantsSchema>;