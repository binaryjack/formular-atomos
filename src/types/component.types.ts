import type { ReactNode } from 'react'
import { CountryCode } from './country.types'
import { PasswordStrength } from './validation.types'

// Re-export PasswordStrength for convenience
export type { PasswordStrength }

/**
 * Base props for all FA components
 */
export interface FABaseProps {
  /** Field ID matching field definition */
  id: string
  /** Additional CSS classes */
  className?: string
  /** Helper text displayed below field */
  helpText?: string
  /** Whether field is disabled */
  disabled?: boolean
  /** Test ID for testing */
  testId?: string
}

/**
 * Input component props
 */
export interface FAInputProps extends FABaseProps {
  placeholder?: string
  maxLength?: number
}

/**
 * Number input props
 */
export interface FANumberProps extends FABaseProps {
  placeholder?: string
  min?: number
  max?: number
  step?: number
}

/**
 * Phone input props
 */
export interface FAPhoneProps extends FABaseProps {
  country: CountryCode
  placeholder?: string
}

/**
 * Email input props
 */
export interface FAEmailProps extends FABaseProps {
  placeholder?: string
}

/**
 * Password input props
 */
export interface FAPasswordProps extends FABaseProps {
  placeholder?: string
  strength?: PasswordStrength
  showStrengthIndicator?: boolean
  showToggle?: boolean
}

/**
 * Postal code input props
 */
export interface FAPostalCodeProps extends FABaseProps {
  country: CountryCode
  placeholder?: string
}

/**
 * Checkbox props
 */
export interface FACheckboxProps extends FABaseProps {}

/**
 * Toggle props
 */
export interface FAToggleProps extends FABaseProps {
  size?: 'sm' | 'md' | 'lg'
  labelPosition?: 'left' | 'right'
}

/**
 * Radio option
 */
export interface FARadioOption {
  value: string | number
  label: string
  disabled?: boolean
}

/**
 * Radio group props
 */
export interface FARadioGroupProps extends FABaseProps {
  options?: FARadioOption[]
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Select props
 */
export interface FASelectProps extends FABaseProps {
  children?: ReactNode
}

/**
 * Textarea props
 */
export interface FATextareaProps extends FABaseProps {
  placeholder?: string
  rows?: number
}

/**
 * File upload props
 */
export interface FAFileUploadProps extends FABaseProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  showFileList?: boolean
  onFileChange?: (files: File[]) => void
  onValidate?: (files: File[]) => string | null
}

/**
 * DatePicker props
 */
export interface FADatePickerProps extends Omit<FABaseProps, 'helpText'> {
  min?: Date
  max?: Date
}

/**
 * TimePicker props
 */
export interface FATimePickerProps extends Omit<FABaseProps, 'helpText'> {
  step?: number
}

/**
 * FASet (FieldSet container) props
 */
export interface FASetProps {
  /** Field ID to get context from */
  id: string
  /** Child form components */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}
