import vine from "@vinejs/vine";

const variantSchemaObject = vine.object({
  sku: vine.string().trim().minLength(1).maxLength(100),
  name: vine.string().trim().minLength(1).maxLength(255),
  options: vine.record(vine.string()).optional(),
  position: vine.number().positive().optional(),
  price: vine.number().positive(),
  stockQuantity: vine.number().min(0).optional(),
  currency: vine.enum(["EUR", "USD", "KRW", "JPY"]).optional(),
  pricesJson: vine.record(vine.number().positive()).optional(),
  isDefault: vine.boolean().optional(),
});

const updateVariantSchemaObject = vine.object({
  id: vine.string().uuid(),
  sku: vine.string().trim().minLength(1).maxLength(100).optional(),
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  options: vine.record(vine.string()).optional(),
  position: vine.number().positive().optional(),
  price: vine.number().positive().optional(),
  stockQuantity: vine.number().min(0).optional(),
  currency: vine.enum(["EUR", "USD", "KRW", "JPY"]).optional(),
  pricesJson: vine.record(vine.number().positive()).optional(),
  isDefault: vine.boolean().optional(),
});

export const createVariantSchema = vine.compile(variantSchemaObject);

export const updateVariantSchema = vine.compile(updateVariantSchemaObject);

// TODO: should extract object to export proper type.
export const updateProductWithVariantsSchema = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    slug: vine
      .string()
      .trim()
      .minLength(1)
      .maxLength(255)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    description: vine.string().trim().optional(),
    isActive: vine.boolean().optional(),
    categoryIds: vine.array(vine.string().uuid()).optional(),
    variants: vine.array(updateVariantSchemaObject).optional(),
  })
);

export const createProductWithVariantsSchema = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    slug: vine
      .string()
      .trim()
      .minLength(1)
      .maxLength(255)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: vine.string().trim().optional(),
    isActive: vine.boolean().optional(),
    categoryIds: vine.array(vine.string().uuid()).optional(),
    variants: vine.array(variantSchemaObject).minLength(1).optional(),
    defaultPrice: vine.number().positive().optional(),
  })
);
