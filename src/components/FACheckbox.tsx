/**
 * FACheckbox - Boolean checkbox input
 */

import { FACheckboxProps } from '@/types/component.types'
import { FormCheckbox } from '@atomos/ui'
import { forwardRef } from 'react'

export const FACheckbox = forwardRef<HTMLInputElement, FACheckboxProps>(
  ({ id, className, helpText, disabled = false, testId: _testId }, ref) => {
    return (
      <FormCheckbox
        ref={ref}
        id={id}
        helpText={helpText}
        disabled={disabled}
        className={className}
      />
    )
  }
)

FACheckbox.displayName = 'FACheckbox'
