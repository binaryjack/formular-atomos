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
  const hasErrors = !!errors

  if (hasErrors && !isFocused) {
    // Show error when there are errors and field is not focused (onBlur)
    return (
      <div className="mt-1 text-sm text-red-500">
        {errors}
      </div>
    )
  }

  if (!hasErrors && guides && isFocused) {
    // Show help text when no errors and field is focused
    return (
      <div className="mt-1 text-sm text-gray-400">
        {guides}
      </div>
    )
  }

  // Hide both when: errors && focused, or no errors && not focused
  return null
}

FASetValidationResult.displayName = 'FASetValidationResult'
