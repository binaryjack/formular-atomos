/**
 * Premium Atomos UI - Glassmorphism Design System
 * Engineered for enterprise-grade applications with state-of-the-art aesthetics.
 */

import React, { createContext, forwardRef, useContext } from 'react'

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

export const FormProvider = ({ 
  initialFields, 
  handleChange: externalHandleChange, 
  handleBlur: externalHandleBlur, 
  children 
}: FormProviderProps) => {
  const errors = React.useMemo(() => {
    const errs: Record<string, string> = {}
    initialFields.forEach(field => {
      const error = field.validation?.error
      if (typeof error === 'string' && error) {
        errs[field.name] = error
      }
    })
    return errs
  }, [initialFields])
  
  const handleChange = (name: string, value: unknown) => {
    if (externalHandleChange) {
      externalHandleChange(name, value)
    }
  }

  const handleBlur = (name: string) => {
    if (externalHandleBlur) {
      externalHandleBlur(name)
    }
  }

  const value: FormContextValue = {
    fields: initialFields,
    errors,
    handleChange,
    handleBlur
  }
  
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// Reusable glass styles
const glassInputBase = "w-full rounded-xl px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 shadow-[0_4px_30px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 ease-out"
const glassFocusStyles = "focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:-translate-y-0.5"
const glassErrorStyles = "border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20"
const glassValidStyles = "border-green-500/50 bg-green-500/5 focus:border-green-500 focus:ring-green-500/20"

export const FormInput = forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'>>((props, ref) => {
  const { id, type = 'text', helpText, testId, ...restProps } = props as any
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  const [isFocused, setIsFocused] = React.useState(false)
  
  const field = fields.find(f => f.name === id)
  const value = (field?.value ?? '') as string
  const hasError = id ? !!errors[id] : false
  const touched = field?.touched
  
  let validationStyles = ''
  if (touched) {
    if (hasError) {
      validationStyles = glassErrorStyles
    } else if (value) {
      validationStyles = glassValidStyles
    }
  }
  
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      value={value}
      data-focused={isFocused}
      data-testid={testId}
      onChange={(e) => {
        if (id) {
          handleChange(id, e.target.value)
        }
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false)
        if (id) {
          handleBlur(id)
        }
      }}
      {...restProps}
      className={`${glassInputBase} ${glassFocusStyles} ${validationStyles} ${props.className || ''}`}
    />
  )
})
FormInput.displayName = 'FormInput'

export const FormTextarea = forwardRef<HTMLTextAreaElement, React.ComponentPropsWithRef<'textarea'>>((props, ref) => {
  const { id, ...restProps } = props
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  const [isFocused, setIsFocused] = React.useState(false)
  
  const field = fields.find(f => f.name === id)
  const value = (field?.value ?? '') as string
  const hasError = id ? !!errors[id] : false
  const touched = field?.touched
  
  let validationStyles = ''
  if (touched) {
    if (hasError) {
      validationStyles = glassErrorStyles
    } else if (value) {
      validationStyles = glassValidStyles
    }
  }
  
  return (
    <textarea
      ref={ref}
      id={id}
      value={value}
      onChange={(e) => {
        if (id) {
          handleChange(id, e.target.value)
        }
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false)
        if (id) {
          handleBlur(id)
        }
      }}
      {...restProps}
      className={`${glassInputBase} ${glassFocusStyles} ${validationStyles} min-h-[120px] resize-y ${props.className || ''}`}
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
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            if (id) {
              handleChange(id, e.target.checked)
            }
          }}
          onBlur={() => {
            if (id) {
              handleBlur(id)
            }
          }}
          {...restProps}
          className="peer appearance-none w-6 h-6 rounded-md backdrop-blur-md bg-white/10 border border-white/20 checked:bg-blue-500 checked:border-blue-400 transition-all duration-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        />
        <svg 
          className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      {label && <span className="text-gray-200 font-medium group-hover:text-white transition-colors select-none">{label}</span>}
    </label>
  )
})
FormCheckbox.displayName = 'FormCheckbox'

export const FormSelect = forwardRef<HTMLSelectElement, React.ComponentPropsWithRef<'select'>>((props, ref) => {
  const { id, children, ...restProps } = props
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find(f => f.name === id)
  const value = (field?.value ?? '') as string
  const hasError = id ? !!errors[id] : false
  const touched = field?.touched
  
  let validationStyles = ''
  if (touched) {
    if (hasError) {
      validationStyles = glassErrorStyles
    } else if (value) {
      validationStyles = glassValidStyles
    }
  }
  
  return (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        value={value}
        onChange={(e) => {
          if (id) {
            handleChange(id, e.target.value)
          }
        }}
        onBlur={() => {
          if (id) {
            handleBlur(id)
          }
        }}
        {...restProps}
        className={`${glassInputBase} ${glassFocusStyles} ${validationStyles} appearance-none cursor-pointer ${props.className || ''}`}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  )
})
FormSelect.displayName = 'FormSelect'

export const FormFileUpload = forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'>>((props, ref) => {
  return (
    <div className="relative group w-full">
      <input 
        ref={ref} 
        type="file" 
        {...props} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
      />
      <div className={`${glassInputBase} flex items-center justify-center border-dashed border-2 group-hover:bg-white/10 transition-all duration-300 h-32`}>
        <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span className="font-medium">Click or drag file to upload</span>
        </div>
      </div>
    </div>
  )
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
      className={`${glassInputBase} ${glassFocusStyles} ${error ? glassErrorStyles : ''} ${props.className || ''}`}
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
      className={`${glassInputBase} ${glassFocusStyles} ${error ? glassErrorStyles : ''} ${props.className || ''}`}
    />
  )
})
TimePicker.displayName = 'TimePicker'

interface ToggleProps extends React.ComponentPropsWithRef<'input'> {
  label?: string
  labelPosition?: 'left' | 'right'
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const { label, labelPosition = 'right', ...rest } = props
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${labelPosition === 'left' ? 'flex-row-reverse' : ''}`}>
      <div className="relative">
        <input ref={ref} type="checkbox" {...rest} className="peer sr-only" />
        <div className="w-12 h-6 backdrop-blur-md bg-white/10 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-500/30 peer-checked:bg-blue-500 transition-all duration-300 border border-white/20 peer-checked:border-blue-400"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-sm"></div>
      </div>
      {label && <span className="text-gray-200 font-medium group-hover:text-white transition-colors select-none">{label}</span>}
    </label>
  )
})
Toggle.displayName = 'Toggle'

export const FieldSet = forwardRef<HTMLFieldSetElement, React.ComponentPropsWithRef<'fieldset'>>((props, ref) => {
  return (
    <fieldset ref={ref} {...props} className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg ${props.className || ''}`} />
  )
})
FieldSet.displayName = 'FieldSet'

interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  required?: boolean
}

export const Label = (props: LabelProps) => {
  return (
    <label htmlFor={props.htmlFor} className={`block text-sm font-semibold text-gray-200 mb-2 tracking-wide uppercase ${props.className || ''}`}>
      {props.children}
      {props.required && <span className="text-blue-400 ml-1.5">*</span>}
    </label>
  )
}

export const ErrorMessage = (props: React.PropsWithChildren<{ className?: string; id?: string }>) => {
  return (
    <div className={`flex items-center gap-1.5 text-red-400 text-sm mt-2 font-medium animate-in slide-in-from-top-1 fade-in duration-300 ${props.className || ''}`}>
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {props.children}
    </div>
  )
}

export const HelpText = (props: React.PropsWithChildren<{ className?: string; id?: string }>) => {
  return <div className={`text-gray-400 text-sm mt-2 flex items-center gap-1.5 ${props.className || ''}`}>
    <svg className="w-4 h-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    {props.children}
  </div>
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = 'relative overflow-hidden font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 outline-none focus:ring-4 hover:-translate-y-0.5 active:translate-y-0 shadow-lg'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 focus:ring-blue-500/30 disabled:from-blue-800 disabled:to-indigo-800 disabled:text-gray-400 disabled:border-white/5 disabled:shadow-none',
    secondary: 'backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:ring-white/20 disabled:bg-white/5 disabled:text-gray-500 disabled:border-white/5 disabled:shadow-none',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border border-red-400/30 focus:ring-red-500/30 disabled:from-red-900 disabled:to-rose-900 disabled:text-gray-400 disabled:border-white/5 disabled:shadow-none'
  }
  
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  }
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-xl"></div>
      
      {isLoading && (
        <svg 
          className="animate-spin flex-shrink-0 relative z-10" 
          width="18" 
          height="18" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
})

Button.displayName = 'Button'
