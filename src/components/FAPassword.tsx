/**
 * FAPassword - Password input with strength validation
 */

import { FAPasswordProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAPassword = forwardRef<HTMLInputElement, FAPasswordProps>(
  (
    {
      id,
      className,
      placeholder,
      helpText,
      disabled = false,
      strength: _strength = 'medium',
      showStrengthIndicator: _showStrengthIndicator = false,
      testId
    },
    ref
  ) => {
    return (
      <FormInput
        ref={ref}
        id={id}
        type="password"
        placeholder={placeholder}
        helpText={helpText}
        disabled={disabled}
        testId={testId}
        className={className}
      />
    )
  }
)

FAPassword.displayName = 'FAPassword'
