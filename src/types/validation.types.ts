import { CountryCode } from './country.types'
import type { FAField } from './field.types'

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
  customValidator?: (value: unknown) => boolean
}

/**
 * Validation rule with message
 */
export interface ValidationRule<T> {
  value: T
  message: string
}

/**
 * Atomos validators (simple validation rules)
 */
export interface AtomosValidation {
  required?: boolean | ValidationRule<boolean>
  minLength?: number | ValidationRule<number>
  maxLength?: number | ValidationRule<number>
  min?: number | ValidationRule<number>
  max?: number | ValidationRule<number>
  pattern?: RegExp | ValidationRule<string>
  email?: boolean | ValidationRule<boolean>
  error?: string
  guide?: string
}

/**
 * Combined validation configuration
 */
export interface ValidationConfig extends AtomosValidation {
  formularValidators?: FormularValidator[]
  /** Formular.dev validation configuration (shorthand) */
  formular?: Record<string, unknown>
  /** Custom validation function */
  custom?: (value: unknown, allFields?: FAField[]) => string | null
}
