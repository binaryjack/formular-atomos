/**
 * FAProvider - Main provider component
 * Wraps forms and manages the adapter lifecycle
 */

import { FAField, FAProviderConfig } from '@/types/field.types'
import { FormProvider as AtomosFormProvider, FormField } from '@atomos/ui'
import React, { createContext, useContext, useMemo } from 'react'
import { FAAdapter } from './FAAdapter'

export interface FAContextValue {
  adapter: FAAdapter
  fields: FAField[]
  errors: Record<string, string>
  formName: string
}

const FAContext = createContext<FAContextValue | null>(null)

/**
 * Hook to access FA adapter
 */
export const useFAContext = () => {
  const context = useContext(FAContext)
  if (!context) {
    throw new Error('useFAContext must be used within FAProvider')
  }
  return context
}

export interface FAProviderProps extends Omit<FAProviderConfig, 'onSubmit'> {
  children: React.ReactNode
  onSubmit: (data: any) => void | Promise<void>
}

export const FAProvider: React.FC<FAProviderProps> = ({
  formName,
  fields: initialFields,
  // locale = 'en', // TODO: implement locale support
  onSubmit,
  onSuccess,
  onError,
  submitLabel = 'Submit',
  showReset = false,
  resetLabel = 'Reset',
  children
}) => {
  const [fields, setFields] = React.useState<FAField[]>(initialFields)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Convert FA fields to Atomos format
  const atomosFields: FormField[] = useMemo(
    () =>
      fields.map((field) => ({
        name: field.name,
        value: field.value ?? '',
        label: field.label,
        validation: {
          required: field.validation?.required ?? null,
          minLength: field.validation?.minLength ?? null,
          maxLength: field.validation?.maxLength ?? null,
          min: field.validation?.min ?? null,
          max: field.validation?.max ?? null,
          pattern: field.validation?.pattern ?? null,
          error: errors[field.name] || ''
        },
        isValid: !errors[field.name],
        touched: field.touched
      })),
    [fields, errors]
  )

  // Create adapter
  const adapter = useMemo(
    () =>
      new FAAdapter(fields, {
        onFieldChange: (name, value) => {
          setFields((prev) =>
            prev.map((f) => (f.name === name ? { ...f, value } : f))
          )
        },
        onFieldBlur: (name) => {
          setFields((prev) =>
            prev.map((f) => (f.name === name ? { ...f, touched: true } : f))
          )
        },
        onErrorChange: (name, error) => {
          setErrors((prev) => ({
            ...prev,
            [name]: error
          }))
        }
      }),
    [fields]
  )

  // Handle Atomos form submission
  const handleAtomosSubmit = async (_formFields: FormField[]) => {
    try {
      const validatedData = await adapter.submit()
      
      if (!validatedData) {
        const errorMsg = 'Please fix all errors before submitting'
        onError?.(errorMsg)
        return
      }

      await onSubmit(validatedData)
      onSuccess?.('Form submitted successfully')
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Submission failed'
      onError?.(errorMsg)
    }
  }

  const contextValue: FAContextValue = {
    adapter,
    fields,
    errors,
    formName
  }

  return (
    <FAContext.Provider value={contextValue}>
      <AtomosFormProvider
        initialFields={atomosFields}
        onSubmit={handleAtomosSubmit}
        onSuccess={onSuccess}
        onError={onError}
        submitLabel={submitLabel}
        showReset={showReset}
        resetLabel={resetLabel}
      >
        {children}
      </AtomosFormProvider>
    </FAContext.Provider>
  )
}
