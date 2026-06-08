/**
 * Central export file for @formular/atomos
 */

// Core
export { FAAdapter } from './core/FAAdapter'
export { FAProvider } from './core/FAProvider'
export { useFAAdapter } from './core/hooks/useFAAdapter'

// Components
export { FAButton } from './components/FAButton'
export { FACheckbox } from './components/FACheckbox'
export { FADatePicker } from './components/FADatePicker'
export { FAEmail } from './components/FAEmail'
export { FAFileUpload } from './components/FAFileUpload'
export { FAInput } from './components/FAInput'
export { FANumber } from './components/FANumber'
export { FAPassword } from './components/FAPassword'
export { FAPhone } from './components/FAPhone'
export { FAPostalCode } from './components/FAPostalCode'
export { FARadioGroup } from './components/FARadioGroup'
export { FASelect } from './components/FASelect'
export { FASet } from './components/FASet'
export { FASetValidationResult } from './components/FASetValidationResult'
export { FATextarea } from './components/FATextarea'
export { FATimePicker } from './components/FATimePicker'
export { FAToggle } from './components/FAToggle'

// Types
export type { FASetValidationResultProps } from './components/FASetValidationResult'
export type {
    FABaseProps, FACheckboxProps, FADatePickerProps, FAEmailProps, FAFileUploadProps, FAInputProps,
    FANumberProps, FAPasswordProps, FAPhoneProps,
    FAPostalCodeProps, FARadioGroupProps,
    FASelectProps, FASetProps, FATextareaProps, FATimePickerProps, FAToggleProps, PasswordStrength
} from './types/component.types'
export { COUNTRIES } from './types/country.types'
export type { CountryCode } from './types/country.types'
export type { FAField, FAFileField, FAPasswordField, FAPhoneField, FAPostalCodeField, FAProviderConfig, FARadioGroupField } from './types/field.types'
export type { AtomosValidation, FormularValidator, ValidationConfig } from './types/validation.types'

