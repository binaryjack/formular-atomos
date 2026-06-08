/**
 * FADatePicker component
 * Wraps Atomos DatePicker with Formular.dev integration
 */

import { DatePicker } from '@atomos/ui'
import { forwardRef } from 'react'
import { useFAField } from '../core/hooks/useFAField'
import type { FADatePickerProps } from '../types/component.types'

export const FADatePicker = forwardRef<HTMLInputElement, FADatePickerProps>(
  ({ id, className, disabled = false, min, max, testId: _testId }, ref) => {
    const { field, error, handleChange, handleBlur } = useFAField(id)

    if (!field) return null

    const value = field.value ? new Date(field.value as string) : undefined
    const minDate = min ? min.toISOString().split('T')[0] : undefined
    const maxDate = max ? max.toISOString().split('T')[0] : undefined

    return (
      <DatePicker
        ref={ref}
        id={id}
        value={value}
        onChange={(date: Date | null) => handleChange(id, date?.toISOString())}
        onBlur={() => handleBlur(id)}
        disabled={disabled || field.disabled}
        min={minDate}
        max={maxDate}
        error={!!error}
        className={className}
      />
    )
  }
)

FADatePicker.displayName = 'FADatePicker'
