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

// Stub interfaces for formular.dev types (not yet published)
export interface IDomManager {}
export interface IExtendedInput {}
export interface IFieldDescriptor { name: string }
export interface IFormDescriptor { fields: IFieldDescriptor[] }
export interface IFormular {}
export interface IFormularManager {}
export interface IInputFactory {}
export interface INotificationManager {}
export interface IServiceManager {}
export interface IStyleManager {}
export interface IValidationManager {}
export interface IValueManager {}
