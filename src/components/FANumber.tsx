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
      min: _min,
      max: _max,
      step: _step,
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
        testId={testId}
        className={className}
      />
    )
  }
)

FANumber.displayName = 'FANumber'
