/**
 * FAButton - Button wrapper for Atomos UI Button
 */

import { Button, ButtonProps } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />
  }
)

FAButton.displayName = 'FAButton'
