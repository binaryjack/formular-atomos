/**
 * Type declarations for formular.dev (peer dependency)
 * These are mock declarations until the actual package is available
 */

declare module 'formular.dev' {
  import { CountryCode } from './country.types'

  export interface FormularValidator {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    email?: boolean
    phone?: CountryCode
    postalCode?: CountryCode
  }

  export interface FormularConfig {
    locale?: string
    validators?: Record<string, unknown>
  }

  export function createForm(config: FormularConfig): Record<string, unknown>
  export const validators: Record<string, unknown>

  // Core manager interfaces (stubs until formular.dev is published)
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
}
