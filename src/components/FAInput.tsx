/**
 * FAInput - General text input component
 * Includes integrated FASet wrapper logic (label, validation, focus tracking)
 */

import { FAInputProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef, useEffect, useState } from 'react'
import { useFAField } from '../core/hooks/useFAField'
import { FASetValidationResult } from './FASetValidationResult'

export const FAInput = forwardRef<HTMLInputElement, FAInputProps>(
  ({ id, className, placeholder, helpText, disabled = false, maxLength, testId }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const { field, error, guide } = useFAField(id)

    useEffect(() => {
      const input = document.getElementById(id)
      if (!input) return

      const handleFocus = () => setIsFocused(true)
      const handleBlur = () => setIsFocused(false)

      input.addEventListener('focus', handleFocus)
      input.addEventListener('blur', handleBlur)

      return () => {
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('blur', handleBlur)
      }
    }, [id])

    if (!field) return null

    return (
      <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="w-full">
          <FormInput
            ref={ref}
            id={id}
            type="text"
            placeholder={placeholder}
            helpText={helpText}
            disabled={disabled}
            maxLength={maxLength}
            testId={testId}
          />
        </div>
        <FASetValidationResult 
          errors={error} 
          guides={guide}
          isFocused={isFocused}
        />
      </div>
    )
  }
)

FAInput.displayName = 'FAInput'
