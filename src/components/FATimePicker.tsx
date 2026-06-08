/**
 * FATimePicker component
 * Wraps Atomos TimePicker with Formular.dev integration
 */

import { TimePicker } from '@atomos/ui'
import { forwardRef } from 'react'
import { useFAField } from '../core/hooks/useFAField'
import type { FATimePickerProps } from '../types/component.types'

export const FATimePicker = forwardRef<HTMLInputElement, FATimePickerProps>(
  ({ id, className, disabled = false, step, testId: _testId }, ref) => {
    const { field, error, handleChange, handleBlur } = useFAField(id)

    if (!field) return null

    return (
      <TimePicker
        ref={ref}
        id={id}
        value={(field.value as string) || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(id, e.target.value)}
        onBlur={() => handleBlur(id)}
        disabled={disabled || field.disabled}
        step={step}
        error={!!error}
        className={className}
      />
    )
  }
)

FATimePicker.displayName = 'FATimePicker'
