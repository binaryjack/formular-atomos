/**
 * FASetValidationResult component
 * Displays error messages and help text based on field state
 * - onErrors && onFocus: Display HelpText | Hide ErrorMessage
 * - onErrors && onBlur: Hide HelpText | Display ErrorMessage
 * - !onErrors && onFocus: Hide HelpText | Hide ErrorMessage
 */

export interface FASetValidationResultProps {
  /** Error messages */
  errors: string | null
  /** Help/guide text */
  guides?: string
  /** Whether field is focused */
  isFocused?: boolean
}

export const FASetValidationResult = ({ errors, guides, isFocused = false }: FASetValidationResultProps) => {
  // Ensure guide exists, log if missing
  if (!guides) {
    console.warn('[FASetValidationResult] No guide message provided')
    guides = '[DEBUG: No guide message configured]'
  }

  const hasError = !!errors

  // If validation error AND focused → show guide
  if (hasError && isFocused) {
    return (
      <div className="mt-1 text-sm !text-green-400" style={{ color: '#4ade80' }}>
        {guides}
      </div>
    )
  }

  // If validation error AND not focused → show error
  if (hasError && !isFocused) {
    return (
      <div className="mt-1 text-sm !text-red-400 font-medium" style={{ color: '#f87171' }}>
        {errors}
      </div>
    )
  }

  return null
}

FASetValidationResult.displayName = 'FASetValidationResult'
