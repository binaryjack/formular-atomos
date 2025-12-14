/**
 * FATextarea - Multi-line text input
 */

import { FATextareaProps } from '@/types/component.types'
import { FormTextarea } from '@atomos/ui'
import { forwardRef } from 'react'

export const FATextarea = forwardRef<HTMLTextAreaElement, FATextareaProps>(
  (
    {
      id,
      className,
      placeholder,
      helpText,
      disabled = false,
      rows = 4,
      testId: _testId
    },
    ref
  ) => {
    return (
      <FormTextarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        helpText={helpText}
        disabled={disabled}
        rows={rows}
        className={className}
      />
    )
  }
)

FATextarea.displayName = 'FATextarea'
