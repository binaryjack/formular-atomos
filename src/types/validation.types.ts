import { CountryCode } from './country.types'

/**
 * Supported locales for error messages
 */
export type FormularLocale = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it'

/**
 * Password strength levels
 */
export type PasswordStrength = 'medium' | 'strong'

/**
 * Formular validator types from formular.dev
 */
export type FormularValidatorType =
  | 'email'
  | 'phone'
  | 'postal'
  | 'ssn'
  | 'password'
  | 'url'
  | 'creditCard'
  | 'custom'

/**
 * Formular validator configuration
 */
export interface FormularValidator {
  type: FormularValidatorType
  country?: CountryCode
  strength?: PasswordStrength
  errorMessage?: string
  customValidator?: (value: any) => boolean
}

/**
 * Atomos validators (simple validation rules)
 */
export interface AtomosValidation {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  error?: string
}

/**
 * Combined validation configuration
 */
export interface ValidationConfig extends AtomosValidation {
  formularValidators?: FormularValidator[]
}
