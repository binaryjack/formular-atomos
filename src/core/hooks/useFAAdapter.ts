/**
 * useFAAdapter hook
 * Provides access to the FA adapter for advanced use cases
 */

import { useFAContext } from '../FAProvider'

export const useFAAdapter = () => {
  const { adapter } = useFAContext()
  return adapter
}
