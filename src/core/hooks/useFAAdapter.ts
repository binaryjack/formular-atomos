/**
 * useFAAdapter hook
 * Provides access to form context for advanced use cases
 */

import React from 'react'
import { FAContext, FAContextValue } from '../FAProvider'
import { useFormContext } from '@atomos/ui'

export const useFAAdapter = (): FAContextValue => {
  const fa = React.useContext(FAContext)
  if (fa) {
    return fa
  }
  return useFormContext() as unknown as FAContextValue
}
