/**
 * FAToggle - Boolean toggle/switch component
 */

import { FAToggleProps } from '@/types/component.types'
import { ErrorMessage, FieldSet, HelpText, Toggle, useFormContext } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAToggle = forwardRef<HTMLInputElement, FAToggleProps>(
  (
    {
      id,
      className,
      helpText,
      disabled = false,
      size: _size = 'md',
      labelPosition = 'right',
      testId: _testId
    },
    ref
  ) => {
    const { fields, errors, handleChange, handleBlur } = useFormContext()

    // Find field by id
    const field = fields.find((f) => f.name === id)

    if (!field && process.env.NODE_ENV === 'development') {
      console.warn(`FAToggle: No field found with id "${id}" in FormContext`)
      return null
    }

    if (!field) return null

    const error = field.touched ? errors[id] : undefined
    const checked = Boolean(field.value)
    const label = field.label

    return (
      <FieldSet spacing="md" className={className}>
        <Toggle
          ref={ref}
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(id, e.target.checked)}
          onBlur={() => handleBlur(id)}
          label={label}
          labelPosition={labelPosition}
          disabled={disabled}
          error={!!error}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!error && helpText && <HelpText>{helpText}</HelpText>}
      </FieldSet>
    )
  }
)

FAToggle.displayName = 'FAToggle'
