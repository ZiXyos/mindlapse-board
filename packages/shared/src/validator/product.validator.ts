import vine from "@vinejs/vine";

export const createProductSchema = vine.compile(
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
  })
);

export const updateProductSchema = vine.compile(
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
  })
);

export const productSchema = createProductSchema;
