/**
 * FAProvider - Main provider component
 * Wraps forms and manages the adapter lifecycle
 */

import { FAField, FAProviderConfig } from '@/types/field.types'
import { FormProvider as AtomosFormProvider, FormField } from '@atomos/ui'
import React, { useMemo } from 'react'
import { FAAdapter } from './FAAdapter'

export interface FAProviderProps extends Omit<FAProviderConfig, 'onSubmit'> {
  children: React.ReactNode
  formName?: string
  onSubmit: (data: FAField[]) => void | Promise<void>
}

export const FAProvider = ({
  fields: initialFields,
  formName,
  // locale = 'en', // TODO: implement locale support
  onSubmit,
  onSuccess,
  onError,
  submitLabel = 'Submit',
  showReset = false,
  resetLabel = 'Reset',
  children
}: FAProviderProps) => {
  const [fields, setFields] = React.useState<FAField[]>(initialFields)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Stable callbacks for adapter
  const onFieldChange = React.useCallback((name: string, value: unknown) => {
    setFields((prev) =>
      prev.map((f) => (f.name === name ? { ...f, value } : f))
    )
  }, [])

  const onFieldBlur = React.useCallback((name: string) => {
    setFields((prev) =>
      prev.map((f) => (f.name === name ? { ...f, touched: true } : f))
    )
  }, [])

  const onErrorChange = React.useCallback((name: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }))
  }, [])

  // Create adapter once with stable callbacks
  const adapter = useMemo(
    () =>
      new FAAdapter(initialFields, {
        onFieldChange,
        onFieldBlur,
        onErrorChange
      }),
    [initialFields, onFieldChange, onFieldBlur, onErrorChange]
  )

  // Wire up adapter to handle changes and validation
  const handleChange = React.useCallback((name: string, value: unknown) => {
    adapter.handleChange(name, value)
  }, [adapter])

  const handleBlur = React.useCallback(async (name: string) => {
    await adapter.handleBlur(name)
  }, [adapter])

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAtomosSubmit(atomosFields)
  }

  return (
    <AtomosFormProvider
      initialFields={atomosFields}
      onSubmit={handleAtomosSubmit}
      onSuccess={onSuccess}
      onError={onError}
      submitLabel={submitLabel}
      showReset={showReset}
      resetLabel={resetLabel}
      handleChange={handleChange}
      handleBlur={handleBlur}
    >
      <form onSubmit={handleFormSubmit} name={formName}>
        {children}
      </form>
    </AtomosFormProvider>
  )
}
