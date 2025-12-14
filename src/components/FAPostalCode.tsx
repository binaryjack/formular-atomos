/**
 * FAPostalCode - Postal code input with country-specific validation
 */

import { FAPostalCodeProps } from '@/types/component.types'
import { COUNTRIES } from '@/types/country.types'
import { FormInput } from '@atomos/ui'
import { forwardRef } from 'react'

export const FAPostalCode = forwardRef<HTMLInputElement, FAPostalCodeProps>(
  ({ id, country, className, placeholder, helpText, disabled = false, testId }, ref) => {
    const countryData = COUNTRIES[country]
    const defaultHelpText = `Format: ${countryData.postalFormat}`
    const finalHelpText = helpText || defaultHelpText

    return (
      <FormInput
        ref={ref}
        id={id}
        type="text"
        placeholder={placeholder || countryData.postalFormat}
        helpText={finalHelpText}
        disabled={disabled}
        testId={testId}
        className={className}
      />
    )
  }
)

FAPostalCode.displayName = 'FAPostalCode'
