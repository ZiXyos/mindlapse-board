export type ValidationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  errors: Record<string, string[]>;
};

export const validateData = async <T>(
  validator: { validate(data: unknown): Promise<T> },
  data: unknown
): Promise<ValidationResult<T>> => {
  try {
    const result = await validator.validate(data);
    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    if (error?.messages) {
      return {
        success: false,
        errors: error.messages,
      };
    }
    throw error;
  }
};

export * from './product'