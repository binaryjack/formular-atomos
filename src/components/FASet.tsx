/**
 * FASet - Field container component
 * Wraps form fields with label and validation feedback
 */

import { ReactNode, useEffect, useState } from 'react'
import { useFAField } from '../core/hooks/useFAField'
import { FASetValidationResult } from './FASetValidationResult'

export interface FASetProps {
  /** Field ID to get context from */
  id: string
  /** Child form components */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export const FASet = ({ id, children, className = '' }: FASetProps) => {
  const { field, error, guide } = useFAField(id)
  const [isFocused, setIsFocused] = useState(false)

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
        {children}
      </div>
      <FASetValidationResult 
        errors={error} 
        guides={guide}
        isFocused={isFocused}
      />
    </div>
  )
}

FASet.displayName = 'FASet'
