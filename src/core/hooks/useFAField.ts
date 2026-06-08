/**
 * useFAField hook
 * Provides field state and handlers for individual FA components
 */

import { useFormContext } from '@atomos/ui'

export const useFAField = (id: string) => {
  const { fields, errors, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find((f) => f.name === id)
  const error = errors[id]
  const guide = field?.validation?.guide as string | undefined

  return {
    field,
    error,
    guide,
    handleChange,
    handleBlur
  }
}
