/**
 * Runtime mock for formular.dev package
 * Used by Storybook and development until the actual package is available
 */

export interface FormularValidator {
  validate: (value: unknown, rules: Record<string, unknown>) => string | null
  validateAsync: (value: unknown, rules: Record<string, unknown>) => Promise<string | null>
}

export const FormularValidator: FormularValidator = {
  validate: () => null,
  validateAsync: async () => null
}

export default FormularValidator
