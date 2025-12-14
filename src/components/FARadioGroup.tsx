/**
 * FARadioGroup - Radio button group component (NEW)
 * Built from scratch since it doesn't exist in Atomos
 */

import { FARadioGroupProps } from '@/types/component.types'
import { ErrorMessage, FieldSet, HelpText, Label, useFormContext } from '@atomos/ui'
import { forwardRef } from 'react'

export const FARadioGroup = forwardRef<HTMLFieldSetElement, FARadioGroupProps>(
  (
    {
      id,
      options,
      className,
      helpText,
      disabled = false,
      orientation = 'vertical',
      testId
    },
    ref
  ) => {
    const { fields, errors, handleChange, handleBlur } = useFormContext()

    // Find field by id
    const field = fields.find((f) => f.name === id)

    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FARadioGroup: No field found with id "${id}" in FormContext`)
      return null
    }

    if (!field) return null

    const error = field.touched ? errors[id] : undefined
    const value = field.value
    const label = field.label
    const required = field.validation.required ?? false

    const orientationClass =
      orientation === 'horizontal' ? 'flex flex-row flex-wrap gap-4' : 'flex flex-col gap-2'

    return (
      <FieldSet spacing="md" className={className} ref={ref}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>

        <div
          className={orientationClass}
          role="radiogroup"
          aria-labelledby={`${id}-label`}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          data-testid={testId}
        >
          {options.map((option) => {
            const optionId = `${id}-${option.value}`
            const isChecked = value === option.value
            const isDisabled = disabled || option.disabled

            return (
              <div key={option.value} className="flex items-center gap-2">
                <input
                  id={optionId}
                  name={id}
                  type="radio"
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) => {
                    handleChange(id, e.target.value)
                  }}
                  onBlur={() => handleBlur(id)}
                  className={`
                    h-4 w-4 rounded-full border text-blue-600 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    ${
                      isDisabled
                        ? 'border-gray-700 bg-gray-900 cursor-not-allowed'
                        : error
                        ? 'border-red-500 bg-gray-800'
                        : 'border-gray-600 bg-gray-800'
                    }
                  `}
                  aria-invalid={!!error}
                />
                <label
                  htmlFor={optionId}
                  className={`text-sm font-medium ${
                    isDisabled ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 cursor-pointer'
                  }`}
                >
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>

        {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
        {!error && helpText && <HelpText id={`${id}-help`}>{helpText}</HelpText>}
      </FieldSet>
    )
  }
)

FARadioGroup.displayName = 'FARadioGroup'
