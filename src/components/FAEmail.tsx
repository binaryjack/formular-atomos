/**
 * FAEmail - Email input with RFC 5322 validation
 */

import { FAEmailProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAEmail = forwardRef<HTMLInputElement, FAEmailProps>(
  ({ id, className, placeholder, helpText, disabled = false, testId }, ref) => {
    return (
      <FormInput
        ref={ref}
        id={id}
        type="email"
        placeholder={placeholder}
        helpText={helpText}
        disabled={disabled}
        testId={testId}
        className={className}
      />
    )
  }
)

FAEmail.displayName = 'FAEmail'
