/**
 * useFAField hook
 * Provides field state and handlers for individual FA components
 */

import React from 'react'
import { FAContext } from '../FAProvider'
import { useFormContext } from '@atomos/ui'

export const useFAField = (id: string) => {
  const faContext = React.useContext(FAContext)
  if (faContext) {
    const field = faContext.fields.find((f) => f.name === id || f.id === id)
    const error = faContext.errors[id]
    const guide = field?.validation?.guide as string | undefined

    return {
      field,
      error,
      guide,
      handleChange: faContext.handleChange,
      handleBlur: faContext.handleBlur
    }
  }

  const { fields, errors, handleChange, handleBlur } = useFormContext()
  
  const field = fields.find((f) => f.name === id || (f as any).id === id)
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
