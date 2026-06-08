/**
 * FAPhone - Phone input with country-specific validation
 */

import { FAPhoneProps } from '@/types/component.types'
import { COUNTRIES } from '@/types/country.types'
import { FormInput } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAPhone = forwardRef<HTMLInputElement, FAPhoneProps>(
  ({ id, country, className, placeholder, helpText, disabled = false, testId }, ref) => {
    const countryData = COUNTRIES[country]
    const defaultHelpText = `Format: ${countryData.phoneFormat}`
    const finalHelpText = helpText || defaultHelpText

    return (
      <FormInput
        ref={ref}
        id={id}
        type="tel"
        placeholder={placeholder || countryData.phoneFormat}
        helpText={finalHelpText}
        disabled={disabled}
        testId={testId}
        className={className}
      />
    )
  }
)

FAPhone.displayName = 'FAPhone'
