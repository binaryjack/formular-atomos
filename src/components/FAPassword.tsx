/**
 * FAPassword - Password input with strength validation
 * Includes integrated FASet wrapper logic (label, validation, focus tracking)
 */

import { FAPasswordProps } from '@/types/component.types'
import { FormInput } from '@atomos/ui'
import { forwardRef, useEffect, useState } from 'react'
import { useFAField } from '../core/hooks/useFAField'
import { FASetValidationResult } from './FASetValidationResult'

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
      showToggle = false,
      testId
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false)
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
        <div className="relative w-full">
          <FormInput
            ref={ref}
            id={id}
            type={isVisible ? 'text' : 'password'}
            placeholder={placeholder}
            helpText={helpText}
            disabled={disabled}
            testId={testId}
          />
          {showToggle && (
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              tabIndex={-1}
            >
              {isVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          )}
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

FAPassword.displayName = 'FAPassword'
