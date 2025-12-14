/**
 * Type declarations for @atomos/ui (peer dependency)
 * These are mock declarations until the actual package is available
 */

declare module '@atomos/ui' {
  import { ComponentPropsWithRef, ReactNode } from 'react'

  export interface FormField {
    name: string
    label: string
    type?: string
    value?: any
    required?: boolean
    disabled?: boolean
    placeholder?: string
    helpText?: string
    validation?: any
    touched?: boolean
  }

  export interface FormContextValue {
    fields: FormField[]
    errors: Record<string, string>
    handleChange: (name: string, value: any) => void
    handleBlur: (name: string) => void
  }

  export function useFormContext(): FormContextValue

  export interface FormProviderProps {
    initialFields: FormField[]
    onSubmit: (fields: FormField[]) => void | Promise<void>
    onSuccess?: (message?: string) => void
    onError?: (error: string) => void
    submitLabel?: string
    showReset?: boolean
    resetLabel?: string
    children: ReactNode
  }

  export const FormProvider: React.FC<FormProviderProps>

  // Form components
  export const FormInput: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'input'> & {
      id: string
      type?: string
      placeholder?: string
      helpText?: string
      disabled?: boolean
      testId?: string
    }
  >

  export const FormTextarea: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'textarea'> & {
      id: string
      placeholder?: string
      helpText?: string
      disabled?: boolean
      rows?: number
      testId?: string
    }
  >

  export const FormCheckbox: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'input'> & {
      id: string
      helpText?: string
      disabled?: boolean
      testId?: string
    }
  >

  export const FormSelect: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'select'> & {
      id: string
      helpText?: string
      disabled?: boolean
      testId?: string
      children: ReactNode
    }
  >

  export const FormFileUpload: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'input'> & {
      id: string
      accept?: string
      multiple?: boolean
      helpText?: string
      disabled?: boolean
      showFileList?: boolean
      onFileChange?: (files: File[]) => void
      onValidate?: (files: File[]) => string | null
    }
  >

  // Atomos primitives
  export const Toggle: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'input'> & {
      id?: string
      disabled?: boolean
      checked?: boolean
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
      onBlur?: () => void
      label?: string
      labelPosition?: 'left' | 'right'
      error?: boolean
    }
  >

  export const FieldSet: React.ForwardRefExoticComponent<
    ComponentPropsWithRef<'fieldset'> & {
      spacing?: 'sm' | 'md' | 'lg'
      children: ReactNode
    }
  >

  export const Label: React.FC<{
    htmlFor?: string
    required?: boolean
    children: ReactNode
  }>

  export const ErrorMessage: React.FC<{
    id?: string
    children: ReactNode
  }>

  export const HelpText: React.FC<{
    id?: string
    children: ReactNode
  }>
}
