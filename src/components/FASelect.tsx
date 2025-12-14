/**
 * FASelect - Dropdown selection component
 */

import { FASelectProps } from '@/types/component.types'
import { FormSelect } from '@atomos/ui'
import { forwardRef } from 'react'

export const FASelect = forwardRef<HTMLSelectElement, FASelectProps>(
  ({ id, children, className, helpText, disabled = false, testId }, ref) => {
    return (
      <FormSelect
        ref={ref}
        id={id}
        helpText={helpText}
        disabled={disabled}
        testId={testId}
        className={className}
      >
        {children}
      </FormSelect>
    )
  }
)

FASelect.displayName = 'FASelect'
