/**
 * FAEmail - Email input with RFC 5322 validation
 */

import { FAEmailProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef, useEffect, useState } from 'react'
import { useFAField } from '../core/hooks/useFAField'
import { FASetValidationResult } from './FASetValidationResult'

export const FAEmail = forwardRef<HTMLInputElement, FAEmailProps>(
  ({ id, className, placeholder, helpText, disabled = false, testId, guide: propGuide }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const { field, error, guide: fieldGuide } = useFAField(id)

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
            type="email"
            placeholder={placeholder}
            helpText={helpText}
            disabled={disabled}
            testId={testId}
          />
        </div>
        <FASetValidationResult 
          errors={error} 
          guides={propGuide || fieldGuide}
          isFocused={isFocused}
        />
      </div>
    )
  }
)

FAEmail.displayName = 'FAEmail'
