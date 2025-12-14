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
    validators?: Record<string, any>
  }

  export function createForm(config: FormularConfig): any
  export const validators: any
}
