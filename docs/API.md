# API Documentation

Complete API reference for @formular/atomos

## Table of Contents

1. [Core Components](#core-components)
2. [Form Components](#form-components)
3. [Types](#types)
4. [Hooks](#hooks)
5. [Utilities](#utilities)

---

## Core Components

### FAProvider

Main provider component that wraps your form and manages validation state.

```tsx
interface FAProviderConfig {
  fields: FAField[]
  onSubmit: (data: Record<string, any>) => void
  initialValues?: Record<string, any>
  onValidate?: (errors: Record<string, string>) => void
}
```

**Props:**
- `fields` *(FAField[])* — Array of field definitions
- `onSubmit` *(function)* — Called when form validation passes
- `initialValues` *(object, optional)* — Default field values
- `onValidate` *(function, optional)* — Called after validation

**Example:**
```tsx
<FAProvider 
  fields={fields} 
  onSubmit={(data) => console.log(data)}
  initialValues={{ username: 'john' }}
>
  {/* Your form components */}
</FAProvider>
```

---

## Form Components

### FAInput

General-purpose text input.

```tsx
interface FAInputProps {
  id: string
  placeholder?: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FAInput 
  id="username" 
  placeholder="Enter username"
  helpText="3-20 characters"
/>
```

---

### FANumber

Number input with min/max/step support.

```tsx
interface FANumberProps extends FAInputProps {
  min?: number
  max?: number
  step?: number
}
```

**Example:**
```tsx
<FANumber 
  id="age" 
  min={18} 
  max={120} 
  step={1}
/>
```

---

### FAEmail

Email input with RFC 5322 validation.

```tsx
interface FAEmailProps {
  id: string
  placeholder?: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FAEmail 
  id="email" 
  placeholder="you@example.com"
/>
```

---

### FAPassword

Password input with strength validation.

```tsx
interface FAPasswordProps {
  id: string
  placeholder?: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
  strength?: 'medium' | 'strong'
}
```

**Strength Requirements:**
- **medium**: 8+ characters
- **strong**: 12+ characters with mixed case, numbers, symbols

**Example:**
```tsx
<FAPassword 
  id="password" 
  strength="strong"
  helpText="At least 12 characters"
/>
```

---

### FATextarea

Multi-line text input.

```tsx
interface FATextareaProps {
  id: string
  placeholder?: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
  rows?: number
}
```

**Example:**
```tsx
<FATextarea 
  id="bio" 
  rows={4}
  placeholder="Tell us about yourself..."
/>
```

---

### FACheckbox

Boolean checkbox input.

```tsx
interface FACheckboxProps {
  id: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FACheckbox 
  id="terms"
  helpText="You must accept to continue"
/>
```

---

### FAToggle

Toggle/switch component for boolean values.

```tsx
interface FAToggleProps {
  id: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FAToggle 
  id="notifications"
  helpText="Receive email updates"
/>
```

---

### FARadioGroup

Radio button group (custom implementation).

```tsx
interface FARadioGroupProps {
  id: string
  options: Array<{ value: string; label: string }>
  orientation?: 'horizontal' | 'vertical'
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FARadioGroup 
  id="plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' }
  ]}
  orientation="horizontal"
/>
```

---

### FASelect

Dropdown selection component.

```tsx
interface FASelectProps {
  id: string
  children: React.ReactNode
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FASelect id="country">
  <option value="">Select...</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</FASelect>
```

---

### FAPhone

Phone number input with country-specific validation.

```tsx
interface FAPhoneProps {
  id: string
  country: CountryCode
  placeholder?: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Supported Countries:** US, CA, UK, DE, FR, CH, IT, ES, AT, NL, BE, LU

**Example:**
```tsx
<FAPhone 
  id="phone" 
  country="US"
/>
```

---

### FAPostalCode

Postal code input with country-specific validation.

```tsx
interface FAPostalCodeProps {
  id: string
  country: CountryCode
  placeholder?: string
  helpText?: string
  disabled?: boolean
  className?: string
  testId?: string
}
```

**Example:**
```tsx
<FAPostalCode 
  id="postal" 
  country="CA"
/>
```

---

### FAFileUpload

File upload component with size and type validation.

```tsx
interface FAFileUploadProps {
  id: string
  accept?: string
  multiple?: boolean
  maxSize?: number
  showFileList?: boolean
  onFileChange?: (files: File[]) => void
  onValidate?: (files: File[]) => string | null
  helpText?: string
  disabled?: boolean
  className?: string
}
```

**Example:**
```tsx
<FAFileUpload 
  id="avatar"
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  helpText="Max 5MB"
/>
```

---

## Types

### FAField

Base field configuration.

```tsx
interface FAField {
  id: string
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'checkbox' | 'toggle' | 'radio' | 'select' | 'phone' | 'postal' | 'file'
  label: string
  required?: boolean
  validation?: ValidationConfig
}
```

### FAPhoneField

```tsx
interface FAPhoneField extends FAField {
  type: 'phone'
  country: CountryCode
}
```

### FAPostalCodeField

```tsx
interface FAPostalCodeField extends FAField {
  type: 'postal'
  country: CountryCode
}
```

### FAPasswordField

```tsx
interface FAPasswordField extends FAField {
  type: 'password'
  strength?: 'medium' | 'strong'
}
```

### FARadioGroupField

```tsx
interface FARadioGroupField extends FAField {
  type: 'radio'
  options: Array<{ value: string; label: string }>
}
```

### FAFileField

```tsx
interface FAFileField extends FAField {
  type: 'file'
  maxSize?: number
  accept?: string
}
```

### ValidationConfig

```tsx
interface ValidationConfig {
  formular?: FormularValidator
  atomos?: AtomosValidation
  custom?: (value: any) => string | null
}

interface FormularValidator {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  email?: boolean
  phone?: CountryCode
  postalCode?: CountryCode
}
```

### CountryCode

```tsx
type CountryCode = 
  | 'US' | 'CA' | 'UK' | 'DE' | 'FR' | 'CH' 
  | 'IT' | 'ES' | 'AT' | 'NL' | 'BE' | 'LU'
```

---

## Hooks

### useFAAdapter

Access the form adapter for advanced use cases.

```tsx
function useFAAdapter(): FAAdapter
```

**Example:**
```tsx
import { useFAAdapter } from '@formular/atomos'

function MyForm() {
  const adapter = useFAAdapter()
  
  const handleManualValidation = () => {
    const errors = adapter.validateAll(formData)
    console.log('Validation errors:', errors)
  }
  
  return <button onClick={handleManualValidation}>Validate</button>
}
```

**Adapter Methods:**
- `validateField(id: string, value: any): string | null`
- `validateAll(data: Record<string, any>): Record<string, string>`
- `submit(data: Record<string, any>): boolean`
- `reset(): void`

---

## Utilities

### COUNTRIES

Country metadata for phone and postal code validation.

```tsx
const COUNTRIES: Record<CountryCode, {
  name: string
  phoneFormat: string
  postalFormat: string
}>
```

**Example:**
```tsx
import { COUNTRIES } from '@formular/atomos'

console.log(COUNTRIES.US.phoneFormat) // "555-123-4567"
console.log(COUNTRIES.DE.postalFormat) // "12345"
```

---

## Advanced Usage

### Custom Validation

```tsx
const fields: FAField[] = [
  {
    id: 'username',
    type: 'text',
    label: 'Username',
    required: true,
    validation: {
      formular: { minLength: 3 },
      custom: (value) => {
        if (value.includes(' ')) {
          return 'Username cannot contain spaces'
        }
        return null
      }
    }
  }
]
```

### Initial Values

```tsx
<FAProvider 
  fields={fields}
  initialValues={{
    username: 'john_doe',
    email: 'john@example.com'
  }}
  onSubmit={handleSubmit}
>
  {/* components */}
</FAProvider>
```

### Validation Callbacks

```tsx
<FAProvider 
  fields={fields}
  onSubmit={(data) => console.log('Submitted:', data)}
  onValidate={(errors) => console.log('Errors:', errors)}
>
  {/* components */}
</FAProvider>
```

---

For more examples, see the [examples directory](../examples/README.md).
