/**
 * Runtime mock for @atomos/ui package
 * Used by Storybook and development until the actual package is available
 */

import React, { createContext, forwardRef, useContext } from 'react'

// Stub types expected by src/types/index.ts
export interface FormAdapter {}
export interface FormState { fields: FormField[]; errors: Record<string, string>; isValid: boolean }

export interface FormField {
  name: string
  label: string
  type?: string
  value?: unknown
  required?: boolean
  disabled?: boolean
  placeholder?: string
  helpText?: string
  validation?: Record<string, unknown>
  touched?: boolean
}

export interface FormContextValue {
  fields: FormField[]
  errors: Record<string, string>
  handleChange: (name: string, value: unknown) => void
  handleBlur: (name: string) => void
}

const FormContext = createContext<FormContextValue | null>(null)

export function useFormContext(): FormContextValue {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider')
  }
  return context
}

export interface FormProviderProps {
  initialFields: FormField[]
  onSubmit: (fields: FormField[]) => void | Promise<void>
  onSuccess?: (message?: string) => void
  onError?: (error: string) => void
  submitLabel?: string
  showReset?: boolean
  resetLabel?: string
  handleChange?: (name: string, value: unknown) => void
  handleBlur?: (name: string) => void | Promise<void>
  children: React.ReactNode
}

export const FormProvider = ({ initialFields, handleChange: externalHandleChange, handleBlur: externalHandleBlur, children }: FormProviderProps) => {
  const [fields, setFields] = React.useState<FormField[]>(initialFields)
  const [errors] = React.useState<Record<string, string>>({})

  const handleChange = (name: string, value: unknown) => {
    if (externalHandleChange) {
      externalHandleChange(name, value)
    } else {
      setFields(prev => prev.map(f => f.name === name ? { ...f, value } : f))
    }
  }

  const handleBlur = (name: string) => {
    if (externalHandleBlur) {
      externalHandleBlur(name)
    } else {
      setFields(prev => prev.map(f => f.name === name ? { ...f, touched: true } : f))
    }
  }

  const value: FormContextValue = {
    fields,
    errors,
    handleChange,
    handleBlur
  }
  
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// Mock form components
export const FormInput = forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'>>((props, ref) => {
  const { id, type = 'text', ...restProps } = props
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find(f => f.name === id)
  const value = field?.value ?? ''
  const error = id ? errors[id] : undefined
  
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      value={value as string}
      onChange={(e) => id && handleChange(id, e.target.value)}
      onBlur={() => id && handleBlur(id)}
      {...restProps}
      className={`w-full border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white ${props.className || ''}`}
    />
  )
})
FormInput.displayName = 'FormInput'

export const FormTextarea = forwardRef<HTMLTextAreaElement, React.ComponentPropsWithRef<'textarea'>>((props, ref) => {
  const { id, ...restProps } = props
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find(f => f.name === id)
  const value = field?.value ?? ''
  const error = id ? errors[id] : undefined
  
  return (
    <textarea
      ref={ref}
      id={id}
      value={value as string}
      onChange={(e) => id && handleChange(id, e.target.value)}
      onBlur={() => id && handleBlur(id)}
      {...restProps}
      className={`w-full border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white ${props.className || ''}`}
    />
  )
})
FormTextarea.displayName = 'FormTextarea'

export const FormCheckbox = forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'> & { label?: string }>((props, ref) => {
  const { id, label, ...restProps } = props
  const { fields, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find(f => f.name === id)
  const checked = Boolean(field?.value)
  
  return (
    <label className="flex items-center gap-2 text-white">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => id && handleChange(id, e.target.checked)}
        onBlur={() => id && handleBlur(id)}
        {...restProps}
        className={`${props.className || ''}`}
      />
      {label && <span>{label}</span>}
    </label>
  )
})
FormCheckbox.displayName = 'FormCheckbox'

export const FormSelect = forwardRef<HTMLSelectElement, React.ComponentPropsWithRef<'select'>>((props, ref) => {
  const { id, children, ...restProps } = props
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find(f => f.name === id)
  const value = field?.value ?? ''
  const error = id ? errors[id] : undefined
  
  return (
    <select
      ref={ref}
      id={id}
      value={value as string}
      onChange={(e) => id && handleChange(id, e.target.value)}
      onBlur={() => id && handleBlur(id)}
      {...restProps}
      className={`w-full border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white ${props.className || ''}`}
    >
      {children}
    </select>
  )
})
FormSelect.displayName = 'FormSelect'

export const FormFileUpload = forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'>>((props, ref) => {
  return <input ref={ref} type="file" {...props} className={`${props.className || ''}`} />
})
FormFileUpload.displayName = 'FormFileUpload'

interface DatePickerProps extends Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange'> {
  value?: Date
  onChange?: (date: Date | null) => void
  error?: boolean
  min?: string
  max?: string
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { value, onChange, error, min, max, ...rest } = props
  const dateValue = value instanceof Date ? value.toISOString().split('T')[0] : ''
  
  return (
    <input
      ref={ref}
      type="date"
      value={dateValue}
      onChange={(e) => onChange?.(e.target.value ? new Date(e.target.value) : null)}
      min={min}
      max={max}
      {...rest}
      className={`border rounded px-3 py-2 ${error ? 'border-red-500' : ''} ${props.className || ''}`}
    />
  )
})
DatePicker.displayName = 'DatePicker'

interface TimePickerProps extends React.ComponentPropsWithRef<'input'> {
  error?: boolean
}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>((props, ref) => {
  const { error, ...rest } = props
  return (
    <input
      ref={ref}
      type="time"
      {...rest}
      className={`border rounded px-3 py-2 ${error ? 'border-red-500' : ''} ${props.className || ''}`}
    />
  )
})
TimePicker.displayName = 'TimePicker'

interface ToggleProps extends React.ComponentPropsWithRef<'input'> {
  label?: string
  labelPosition?: 'left' | 'right'
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const { id, label, labelPosition = 'right', ...rest } = props
  const { fields, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find(f => f.name === id)
  const checked = Boolean(field?.value)
  
  return (
    <label className={`flex items-center gap-2 text-white ${labelPosition === 'left' ? 'flex-row-reverse' : ''}`}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => id && handleChange(id, e.target.checked)}
        onBlur={() => id && handleBlur(id)}
        {...rest}
        className={`${props.className || ''}`}
      />
      {label && <span>{label}</span>}
    </label>
  )
})
Toggle.displayName = 'Toggle'

export const FieldSet = forwardRef<HTMLFieldSetElement, React.ComponentPropsWithRef<'fieldset'>>((props, ref) => {
  return <fieldset ref={ref} {...props} className={`border rounded p-4 ${props.className || ''}`} />
})
FieldSet.displayName = 'FieldSet'

interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  required?: boolean
}

export const Label = (props: LabelProps) => {
  return (
    <label htmlFor={props.htmlFor} className={`block font-medium mb-1 ${props.className || ''}`}>
      {props.children}
      {props.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

export const ErrorMessage = (props: React.PropsWithChildren<{ className?: string; id?: string }>) => {
  return <div className={`text-red-600 text-sm mt-1 ${props.className || ''}`}>{props.children}</div>
}

export const HelpText = (props: React.PropsWithChildren<{ className?: string; id?: string }>) => {
  return <div className={`text-gray-600 text-sm mt-1 ${props.className || ''}`}>{props.children}</div>
}
