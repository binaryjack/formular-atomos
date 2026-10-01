/**
 * FANumber - Number input component
 */

import { FANumberProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef } from 'react'

export const FANumber = forwardRef<HTMLInputElement, FANumberProps>(
  (
    {
      id,
      className,
      placeholder,
      helpText,
      disabled = false,
      min,
      max,
      step,
      testId
    },
    ref
  ) => {
    return (
      <FormInput
        ref={ref}
        id={id}
        type="number"
        placeholder={placeholder}
        helpText={helpText}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        testId={testId}
        className={className}
      />
    )
  }
)

FANumber.displayName = 'FANumber'
