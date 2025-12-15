/**
 * FASelect - Dropdown selection component
 */

import { useFAField } from '@/core/hooks/useFAField'
import { FASelectProps } from '@/types/component.types'
import { FAField, FAOption } from '@/types/field.types'
import { FormSelect } from '@atomos/ui'
import { forwardRef } from 'react'

export const FASelect = forwardRef<HTMLSelectElement, FASelectProps>(
  ({ id, children, className, helpText, disabled = false, testId }, ref) => {
    const { field } = useFAField(id)

    if (!field) return null

    // Cast to FAField to access options property
    const faField = field as unknown as FAField

    // If children provided, use them; otherwise generate from field options
    const selectContent = children || (
      faField.options?.map((option: FAOption) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))
    )

    return (
      <FormSelect
        ref={ref}
        id={id}
        helpText={helpText}
        disabled={disabled}
        testId={testId}
        className={className}
      >
        {selectContent}
      </FormSelect>
    )
  }
)

FASelect.displayName = 'FASelect'
