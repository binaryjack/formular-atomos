/**
 * Central export file for @formular/atomos
 */

// Core
export { FAAdapter } from './core/FAAdapter'
export { FAProvider } from './core/FAProvider'
export { useFAAdapter } from './core/hooks/useFAAdapter'

// Components
export { FACheckbox } from './components/FACheckbox'
export { FAEmail } from './components/FAEmail'
export { FAFileUpload } from './components/FAFileUpload'
export { FAInput } from './components/FAInput'
export { FANumber } from './components/FANumber'
export { FAPassword } from './components/FAPassword'
export { FAPhone } from './components/FAPhone'
export { FAPostalCode } from './components/FAPostalCode'
export { FARadioGroup } from './components/FARadioGroup'
export { FASelect } from './components/FASelect'
export { FATextarea } from './components/FATextarea'
export { FAToggle } from './components/FAToggle'

// Types
export type {
    FABaseProps, FACheckboxProps, FAEmailProps, FAFileUploadProps, FAInputProps,
    FANumberProps, FAPasswordProps, FAPhoneProps,
    FAPostalCodeProps, FARadioGroupProps,
    FASelectProps, FATextareaProps, FAToggleProps, PasswordStrength
} from './types/component.types'
export { COUNTRIES } from './types/country.types'
export type { CountryCode } from './types/country.types'
export type { FAField, FAFileField, FAPasswordField, FAPhoneField, FAPostalCodeField, FAProviderConfig, FARadioGroupField } from './types/field.types'
export type { AtomosValidation, FormularValidator, ValidationConfig } from './types/validation.types'

