/**
 * FAInput - General text input component
 */

import { FAInputProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAInput = forwardRef<HTMLInputElement, FAInputProps>(
  ({ id, className, placeholder, helpText, disabled = false, maxLength, testId }, ref) => {
    return (
      <FormInput
        ref={ref}
        id={id}
        type="text"
        placeholder={placeholder}
        helpText={helpText}
        disabled={disabled}
        maxLength={maxLength}
        testId={testId}
        className={className}
      />
    )
  }
)

FAInput.displayName = 'FAInput'
