import { CountryCode } from './country.types'
import { FormularLocale, PasswordStrength, ValidationConfig } from './validation.types'

/**
 * Field input types
 */
export type FAFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'password'
  | 'number'
  | 'url'
  | 'date'
  | 'time'
  | 'postal'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea'
  | 'file'
  | 'toggle'

/**
 * Base field definition
 */
export interface FAField {
  /** Unique field identifier (camelCase) */
  id?: string
  /** Unique field name */
  name: string
  /** Initial field value */
  value?: unknown
  /** Display label */
  label: string
  /** Field type */
  type?: FAFieldType
  /** Whether field is required */
  required?: boolean
  /** Whether field is disabled */
  disabled?: boolean
  /** Options for select/radio fields */
  options?: FAOption[]
  /** Validation configuration */
  validation?: ValidationConfig
  /** Whether field has been touched */
  touched?: boolean
  /** Whether field is valid */
  isValid?: boolean
}

/**
 * Phone field configuration
 */
export interface FAPhoneField extends FAField {
  type: 'tel'
  country: CountryCode
}

/**
 * Postal code field configuration
 */
export interface FAPostalCodeField extends FAField {
  type: 'postal'
  country: CountryCode
}

/**
 * Password field configuration
 */
export interface FAPasswordField extends FAField {
  type: 'password'
  strength?: PasswordStrength
}

/**
 * Select/Radio option
 */
export interface FAOption {
  value: string | number
  label: string
  disabled?: boolean
}

/**
 * Radio group field configuration
 */
export interface FARadioGroupField extends FAField {
  type: 'radio'
  options: FAOption[]
}

/**
 * File upload configuration
 */
export interface FAFileField extends FAField {
  type: 'file'
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
}

/**
 * Provider configuration
 */
export interface FAProviderConfig {
  /** Unique form identifier */
  formName: string
  /** Field definitions */
  fields: FAField[]
  /** Error message locale */
  locale?: FormularLocale
  /** Submit handler - receives validated data */
  onSubmit: (data: FAField[]) => void | Promise<void>
  /** Success callback */
  onSuccess?: (message?: string) => void
  /** Error callback */
  onError?: (error: string) => void
  /** Submit button text */
  submitLabel?: string
  /** Show reset button */
  showReset?: boolean
  /** Reset button text */
  resetLabel?: string
}
